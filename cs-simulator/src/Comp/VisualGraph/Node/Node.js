import React, { Component } from "react";
import classes from "./Node.module.css";


const SIMPLE_NODE = 0;
const START_NODE = 1;
const TARGET_NODE = 2;
const BLOCK_NODE = 3;
const ALGO_NODE = 4;
const PATH_NODE = 5;

class Node extends Component {
  isStartNode = props =>
    props.vertices[props.row][props.col]===START_NODE;
    //props.row === props.startNode[0] && props.col === props.startNode[1];
  isTargetNode = props =>
    props.vertices[props.row][props.col]===TARGET_NODE;
    //props.row === props.targetNode[0] && props.col === props.targetNode[1];
  isBlockingNode = props => {
    this.isBlocking = props.vertices[props.row][props.col]===BLOCK_NODE;
    /*
    this.isBlocking = props.blockingNodes.has(
      props.row.toString() + "," + props.col.toString()
    );*/
    return this.isBlocking;
  };
  isNextAlgoNode = props => props.vertices[props.row][props.col]===ALGO_NODE;/*{
    return props.nextAlgoNodes.has(
      props.row.toString() + "," + props.col.toString()
    );
  };*/
  isNextPathNode = props => props.vertices[props.row][props.col]===PATH_NODE/*{
    return props.nextPathNodes.has(
      props.row.toString() + "," + props.col.toString()
    );
  };*/


  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.vertices[this.props.row][this.props.col] !== this.props.vertices[this.props.row][this.props.col]
    /*
    const changedStartNode = this.isStartNode(nextProps)!==this.isStartNode(this.props);
      this.props.startNode[0] !== nextProps.startNode[0] ||
      this.props.startNode[1] !== nextProps.startNode[1];
    const changedTargetNode =this.isTargetNode(nextProps)!==this.isTargetNode(this.props);
    
      this.props.targetNode[0] !== nextProps.targetNode[0] ||
      this.props.targetNode[1] !== nextProps.targetNode[1];
    return changedStartNode || changedTargetNode || this.isBlocking !== this.isBlockingNode(nextProps) ||this.isNextPathNode(nextProps)!=this.isNextPathNode(nextProps) || this.isNextPathNode(this.props)!==this.isNextPathNode(nextProps);
    */
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