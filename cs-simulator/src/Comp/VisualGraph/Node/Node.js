import React, { Component } from "react";
import classes from "./Node.module.css";

class Node extends Component {
  isStartNode = props =>
    props.row === props.startNode[0] && props.col === props.startNode[1];
  isTargetNode = props =>
    props.row === props.targetNode[0] && props.col === props.targetNode[1];
  isBlockingNode = props => {
    this.isBlocking = props.blockingNodes.has(
      props.row.toString() + "," + props.col.toString()
    );
    return this.isBlocking;
  };
  isNextAlgoNode = props => {
    return props.nextAlgoNodes.has(
      props.row.toString() + "," + props.col.toString()
    );
  };
  isNextPathNode = props => {
    return props.nextPathNodes.has(
      props.row.toString() + "," + props.col.toString()
    );
  };


  
  shouldComponentUpdate(nextProps, nextState) {
    
    const changedStartNode =
      this.props.startNode[0] !== nextProps.startNode[0] ||
      this.props.startNode[1] !== nextProps.startNode[1];
    const changedTargetNode =
      this.props.targetNode[0] !== nextProps.targetNode[0] ||
      this.props.targetNode[1] !== nextProps.targetNode[1];
    const key = nextProps.row.toString() + "," + nextProps.col.toString();
    const isBlockingNode = this.isBlocking !== nextProps.blockingNodes.has(key);
    return isBlockingNode || changedStartNode || changedTargetNode || this.isNextAlgoNode(nextProps);
  }

  render() {
    return (
      <div
        className={
          this.isStartNode(this.props)
            ? classes.StartNode
            : this.isTargetNode(this.props)
            ? classes.TargetNode
            : this.isNextPathNode(this.props) 
            ? classes.PathNode
            : this.isNextAlgoNode(this.props) 
            ? classes.AlgoNode
            : this.isBlockingNode(this.props)
            ? classes.WeightedNode
            : classes.Node
        }
        onMouseOver={() =>
          this.props.nodeClickHandler(this.props.row, this.props.col)
        }
        onMouseUp={() =>
          this.props.mouseHover(this.props.row, this, this.props.col)
        }
        onMouseDown={() =>
          this.props.mouseHover(this.props.row, this.props.col)
        }
        onClick={() => this.props.onNodeClick(this.props.row, this.props.col)}
      ></div>
    );
  }
}

export default Node;