import React from "react";
import classes from "./BuildControl.module.css";
const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <p className={classes.Label}> {props.label1}</p>
      <input
        tabIndex="0"
        onKeyDown={props.handleSecond}
        type={props.input}
        onChange={props.handleFirst}
      />
      <button onClick={props.handleSecond}> {props.label2} </button>
      <button onClick={props.randomHandler} style={{ width: "200px" }}>
        Random Array
      </button>
    </div>
  );
};

export default buildControl;
