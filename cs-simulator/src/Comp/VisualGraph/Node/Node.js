import React, { Component } from "react";
import classes from "./Node.module.css";
import {
  START_NODE,
  TARGET_NODE,
  BLOCK_NODE,
  ALGO_NODE,
  PATH_NODE,
  WEIGHTED_NODE,
  SIMPLE_NODE
} from "../../../Containers/GraphController/Constants";

const styles = new Map([
  [START_NODE, classes.StartNode],
  [TARGET_NODE, classes.TargetNode],
  [BLOCK_NODE, classes.BlockingNode],
  [ALGO_NODE, classes.AlgoNode],
  [PATH_NODE, classes.PathNode],
  [WEIGHTED_NODE, classes.WeightedNode],
  [WEIGHTED_NODE * ALGO_NODE, classes.AlgoNode],
  [WEIGHTED_NODE * PATH_NODE, classes.PathNode],
  [SIMPLE_NODE, classes.Node]
]);

class Node extends Component {
  isStartNode = props => props.vertices[props.row][props.col] === START_NODE;
  isTargetNode = props => props.vertices[props.row][props.col] === TARGET_NODE;
  isWeightedNode = props =>
    props.vertices[props.row][props.col] === WEIGHTED_NODE;
  isBlockingNode = props => {
    this.isBlocking = props.vertices[props.row][props.col] === BLOCK_NODE;
    return this.isBlocking;
  };
  isNextAlgoNode = props => props.vertices[props.row][props.col] === ALGO_NODE;
  isNextPathNode = props => props.vertices[props.row][props.col] === PATH_NODE;
  isWeightedAlgoNode = props =>
    props.vertices[props.row][props.col] === WEIGHTED_NODE * ALGO_NODE;
  isWeightedPathNode = props =>
    props.vertices[props.row][props.col] === WEIGHTED_NODE * ALGO_NODE;
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.vertices[this.props.row][this.props.col] !==
      this.props.vertices[this.props.row][this.props.col]
    );
  }
  render() {
    return (
      <div
        className={styles.get(
          this.props.vertices[this.props.row][this.props.col]
        )}
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
