import React, { Component } from "react";
import classes from "./Node.module.css";
import {
  START_NODE,
  TARGET_NODE,
  BLOCK_NODE,
  ALGO_NODE,
  PATH_NODE
} from "../../../Containers/GraphController/Constants";

class Node extends Component {
  isStartNode = props => props.vertices[props.row][props.col] === START_NODE;
  isTargetNode = props => props.vertices[props.row][props.col] === TARGET_NODE;
  isBlockingNode = props => {
    this.isBlocking = props.vertices[props.row][props.col] === BLOCK_NODE;
    return this.isBlocking;
  };
  isNextAlgoNode = props => props.vertices[props.row][props.col] === ALGO_NODE;
  isNextPathNode = props => props.vertices[props.row][props.col] === PATH_NODE;

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.vertices[this.props.row][this.props.col] !==
      this.props.vertices[this.props.row][this.props.col]
    );
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
