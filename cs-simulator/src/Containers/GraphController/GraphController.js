import React, { Component } from "react";
import Board from "../../Comp/VisualGraph/Board/Board";
import BuildControls from "../../Comp/BuildControls/BuildControls";
import axios from "axios";


const SIMPLE_NODE = 0;
const START_NODE = 1;
const TARGET_NODE = 2;
const BLOCK_NODE = 3;
const ALGO_NODE = 4;
const PATH_NODE = 5;


const algoNames = ["BFS","DFS","A*"];
class GraphController extends Component {
  constructor(props) {
    super(props);
    this.actions = [];
  }
  
  rows=20;
  cols=30;


  initVertices = () => {
    const vertices = [...Array(this.rows)].map(x=>Array(this.cols).fill(0));
    vertices[0][0]=START_NODE;
    vertices[0][15]=TARGET_NODE;
    return vertices;
  };

  state = {
    vertices: this.initVertices(),
    startNode: [0,0],
    targetNode: [0, 15],
    /*blockingNodes: new Set(),
    nextAlgoNodes: new Set(),
    nextPathNodes: new Set(),*/
    //hovering booleans :
    hoveringOnNode: false,
    hoveringOnTargetNode: false,
    hoveringOnStartNode: false,
    //Run algo booleans :
    clickRunAlgo: false,
    chosenAlgo: -1,
    mustChooseAlgo: false,
    runningAlgo: false,
    runPathAlgo:false,
  };

  isStartNode = (row, col) =>
    this.state.startNode[0] === row && this.state.startNode[1] === col;
  isTargetNode = (row, col) =>
    this.state.targetNode[0] === row && this.state.targetNode[1] === col;

  //Handels a single click on a single node.
  nodeClicked = (row, col) => {
    if (!this.isStartNode(row, col) && !this.isTargetNode(row, col)) {
      const val = this.state.vertices[row][col]===1 ? SIMPLE_NODE : BLOCK_NODE;
      const newVertices = this.state.vertices.map((elem) => elem.slice()).slice();
      newVertices[row][col]=val;
      this.setState({vertices:newVertices});
    }
  };

  /*
    Handles the actual hovering over bunch of nodes,
    dependes on the hovering state which is set by: hoveringOnNodes.
  */
  nodeClickHandler = (row, col) => {
    if (this.state.hoveringOnNode) {
      const newVertices = this.state.vertices.map((elem) => elem.slice()).slice();
      const val = this.state.hoveringOnStartNode ? START_NODE : this.state.hoveringOnTargetNode ?  TARGET_NODE : this.state.vertices[row][col]===BLOCK_NODE ? SIMPLE_NODE : BLOCK_NODE;
      if (this.state.hoveringOnStartNode){
        newVertices[this.state.startNode[0]][this.state.startNode[1]]=SIMPLE_NODE;
        newVertices[row][col]=val;
        this.setState({ startNode:[row,col], vertices:newVertices });
      }
      else if (this.state.hoveringOnTargetNode){
        newVertices[this.state.targetNode[0]][this.state.targetNode[1]]=SIMPLE_NODE;
        newVertices[row][col]=val;
        this.setState({targetNode:[row,col], vertices:newVertices });
      }
      else if(!this.isStartNode(row,col) && !this.isTargetNode(row,col)){
        newVertices[row][col]=val;
        this.setState({vertices:newVertices});
      }
    }
  };

  //Activate and disabling hovering mode, dependes on which node the hover starts
  hoveringOnNodes = (row, col,simple) => {
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
      //startNode={this.state.startNode}
      //targetNode={this.state.targetNode}
      board={this.state.vertices}
      nodeClickHandler={this.nodeClickHandler}
      //blockingNodes={this.state.blockingNodes}
      mouseHovering={this.hoveringOnNodes}
      onNodeClick={this.nodeClicked}
     // nextAlgoNodes={this.state.nextAlgoNodes}
      runningAlgo={this.state.runningAlgo}
      isPathAlgo={this.state.runPathAlgo}
      //nextPathNodes={this.state.nextPathNodes}
    />
  );

  clickRunAlgo = () => {
    this.setState({ clickRunAlgo: true });
  };

  chooseAlgo = chosenIndex => {
    const parsedIndex = parseInt(chosenIndex);
    const prevIndex = this.state.chosenAlgo;
    this.setState({ chosenAlgo: parsedIndex === prevIndex ? -1 : parsedIndex });
  };

  addControls = () => (
    <div>
      <BuildControls
        algoClickHandler={this.chooseAlgo}
        currAlgoIndex={this.state.chosenAlgo}
        clickRunHandler={this.clickRunAlgo}
        algoNames = {algoNames}
      />
    </div>
  );
  render = () => (
    <div>
      {this.getBoard()}
      {this.addControls()}
    </div>
  );

  startActions(data) {
    const actions = data['actions'];
    const path = data['path'];
    console.log(path);

    if (this.state.chosenAlgo !== -1) {
      this.actions = actions.slice();
      this.path=path.slice();
      this.setState({ clickRunAlgo: false, runningAlgo: true });
    } else if (this.state.chosenAlgo === -1) {
      this.setState({ clickRunAlgo: false, mustChooseAlgo: true });
    }
  }

  getKey = node => node[0] + "," + node[1];

  /*
  1 - blocking
  2 - algo node
  3 - path

  */
  runIteration(isPath) {
    const currentArray = isPath ? this.path :this.actions;
    const nextNode =  currentArray.shift();
    const nodeVal = isPath ? PATH_NODE: ALGO_NODE; 
    const newVertices = this.state.vertices.map((elem) => elem.slice()).slice();
    newVertices[nextNode[0]][nextNode[1]] = nodeVal
    if(currentArray.length>0){
      this.setState({vertices:newVertices});
    }
    else{
      if(isPath)
        this.setState({vertices:newVertices, runningAlgo: false,runPathAlgo: false});
      else
        this.setState({vertices:newVertices, runningAlgo: false,runPathAlgo: true});
    }
    /*
    const nextAlgoNodes = new Set(isPath ? this.state.nextPathNodes : this.state.nextAlgoNodes);
    nextAlgoNodes.add(this.getKey(nextNode));
    if(isPath){
      if (this.path.length > 0)
        this.setState({ nextPathNodes: nextAlgoNodes });
      else this.setState({ nextPathNodes: nextAlgoNodes, runningAlgo: false,runPathAlgo: false });
    }
    else{
      if (this.actions.length > 0)
        this.setState({ nextAlgoNodes: nextAlgoNodes });
      else this.setState({ nextAlgoNode: nextAlgoNodes, runningAlgo: false,runPathAlgo: true });
    }*/
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
              isGraph: true,
              row: this.rows,
              col:this.cols
            })
          )
          .then(repsonse => this.startActions(repsonse.data))
          .catch(error => console.log(error));
      }
    }
    if (this.state.runningAlgo) {
      setTimeout(() => this.runIteration(false), 5);
    }
    if(this.state.runPathAlgo){
      setTimeout(() => this.runIteration(true), 5);
    }
  }
}
export default GraphController;
