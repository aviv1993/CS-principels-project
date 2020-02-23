import classes from "./NodeButton.module.css";
import React from "react";
const getStyle = props =>
  props.nodeProps.type === props.currNode
    ? {
        "background-color": props.nodeProps.color,
        border: "3px solid white"
      }
    : { "background-color": props.nodeProps.color };

const nodeButton = props => (
  <div
    className={props.nodeProps.hover ? classes.NodeHover : classes.Node}
    style={getStyle(props)}
    onClick={() =>
      props.nodeTypeHandler(
        props.nodeProps.hover ? props.nodeProps.type : props.currNode
      )
    }
  >
    <span className={classes.ToolTipText}>{props.nodeProps.explain}</span>
  </div>
);

export default nodeButton;
