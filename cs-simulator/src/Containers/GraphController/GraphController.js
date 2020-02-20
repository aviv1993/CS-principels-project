import React, { Component } from "react";
import Board from "../../Comp/VisualGraph/Board/Board";
import BuildControls from "../../Comp/BuildControls/BuildControls";
import axios from "axios";

class GraphController extends Component {
  constructor(props) {
    super(props);
    this.actions = [];
  }
  initVertices = () => {
    const rows = 44;
    const cols = 18;
    return [...Array(cols).keys()].map(elem => [...Array(rows).keys()]);
  };

  state = {
    vertices: this.initVertices(),
    startNode: [9, 5],
    targetNode: [9, 40],
    blockingNodes: new Set(),
    nextAlgoNodes: new Set(),
    //hovering booleans :
    hoveringOnNode: false,
    hoveringOnTargetNode: false,
    hoveringOnStartNode: false,
    //Run algo booleans :
    clickRunAlgo: false,
    chosenAlgo: 0,
    mustChooseAlgo: false,
    runningAlgo: false
  };

  isStartNode = (row, col) =>
    this.state.startNode[0] === row && this.state.startNode[1] === col;
  isTargetNode = (row, col) =>
    this.state.targetNode[0] === row && this.state.targetNode[1] === col;

  //Handels a single click on a given node.
  nodeClicked = (row, col) => {
    if (!this.isStartNode(row, col) && !this.isTargetNode(row, col)) {
      const blockingNodes = new Set(this.state.blockingNodes);
      const key = row.toString() + "," + col.toString();
      blockingNodes.has(key)
        ? blockingNodes.delete(key)
        : blockingNodes.add(key);
      this.setState({ blockingNodes: blockingNodes });
    }
  };

  /*
    Handles the actual hovering over bunch of nodes,
    dependes on the hovering state which is set by: hoveringOnNodes.
  */
  nodeClickHandler = (row, col) => {
    if (this.state.hoveringOnNode) {
      if (this.state.hoveringOnStartNode)
        this.setState({ startNode: [row, col] });
      else if (this.state.hoveringOnTargetNode)
        this.setState({ targetNode: [row, col] });
      else {
        const blockingNodes = new Set(this.state.blockingNodes);
        const key = row.toString() + "," + col.toString();
        if (!blockingNodes.has(key)) blockingNodes.add(key);
        else blockingNodes.delete(key);
        this.setState({ blockingNodes: blockingNodes });
      }
    }
  };

  //Activate hovering mode, dependes on which node the hover starts
  hoveringOnNodes = (row, col) => {
    const hoverOnNode = !this.state.hoveringOnNode;
    const hoveringOnStartNode = this.isStartNode(row, col) && hoverOnNode;
    const hoveringOnTargetNode = this.isTargetNode(row, col) && hoverOnNode;
    this.setState({
      hoveringOnNode: hoverOnNode,
      hoveringOnStartNode: hoveringOnStartNode,
      hoveringOnTargetNode: hoveringOnTargetNode
    });
  };

  mouseLeave = () => {
    this.setState({
      hoveringOnNode: false,
      hoveringOnTargetNode: false,
      hoveringOnStartNode: false
    });
  };

  getBoard = () => (
    <Board
      mouseLeave={this.mouseLeave}
      startNode={this.state.startNode}
      targetNode={this.state.targetNode}
      board={this.state.vertices}
      nodeClickHandler={this.nodeClickHandler}
      blockingNodes={this.state.blockingNodes}
      mouseHovering={this.hoveringOnNodes}
      onNodeClick={this.nodeClicked}
      nextAlgoNodes={this.state.nextAlgoNodes}
      runningAlgo={this.state.runningAlgo}
    />
  );

  clickRunAlgo = () => {
    this.setState({ clickRunAlgo: true });
  };

  addControls = () => (
    <div>
      <BuildControls
        algoClickHandler={this.chooseAlgo}
        currAlgoIndex={this.state.chosenAlgo}
        clickRunHandler={this.clickRunAlgo}
      />
    </div>
  );
  render = () => (
    <div>
      {this.getBoard()}
      {this.addControls()}
    </div>
  );

  startActions(actions) {
    if (this.state.chosenAlgo !== -1) {
      this.actions = actions["Actions"].slice();
      this.setState({ clickRunAlgo: false, runningAlgo: true });
    } else if (this.state.chosenAlgo === -1) {
      this.setState({ clickRunAlgo: false, mustChooseAlgo: true });
    }
  }

  getKey = node => node[0] + "," + node[1];
  runIteration() {
    const nextNode = this.actions.shift();
    const nextAlgoNodes = new Set(this.state.nextAlgoNodes);
    nextAlgoNodes.add(this.getKey(nextNode));
    if (this.actions.length > 0)
      this.setState({ nextAlgoNodes: nextAlgoNodes });
    else this.setState({ nextAlgoNode: nextAlgoNodes, runningAlgo: false });
  }

  componentDidUpdate() {
    if (this.state.clickRunAlgo) {
      if (this.state.chosenAlgo === -1)
        this.setState({ clickRunAlgo: false, mustChooseAlgo: true });
      else {
        axios
          .post(
            "http://localhost:8080",
            JSON.stringify({
              algo: this.state.chosenAlgo,
              blockingNodes: [...this.state.blockingNodes],
              startNode: this.state.startNode,
              targetNode: this.state.targetNode,
              isArray: false,
              isGraph: true
            })
          )
          .then(repsonse => this.startActions(repsonse.data))
          .catch(error => console.log(error));
      }
    }
    if (this.state.runningAlgo) {
      setTimeout(() => this.runIteration(), 10);
    }
  }
}
export default GraphController;
