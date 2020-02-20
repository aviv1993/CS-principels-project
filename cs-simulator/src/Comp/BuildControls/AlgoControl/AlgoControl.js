import React from "react";
import classes from "./AlgoControl.module.css";

const algoControl = props => (
  <div className={props.chosen ? classes.Pressed : classes.AlgoControl}>
    <button onClick={() => props.clickHandler(props.algoIndex)}>
      {props.name}
    </button>
  </div>
);

export default algoControl;
