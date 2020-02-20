import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import AlgoControl from "./AlgoControl/AlgoControl";
import classes from "./BuildControls.module.css";
import classes2 from "./AlgoControl/AlgoControl.module.css";

const algoButtons = ["Naive Sort", "Bubble Sort", "Quick Sort", "Merge Sort"];

const getAlgoButtons = (currIndex, handler,algoNames) =>
  algoNames.map((name, i) => (
    <AlgoControl
      key={name}
      algoIndex={i.toString()}
      chosen={i === currIndex}
      name={name}
      clickHandler={handler}
    />
  ));

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {props.addHandler === undefined ? null : (
        <BuildControl
          label1={"Value:"}
          label2={"Add"}
          inputType={"number"}
          handleFirst={props.addHandler}
          handleSecond={props.addConfirmHandler}
        />
      )}
      <div style={{ display: "flex" }}>
        {getAlgoButtons(props.currAlgoIndex, props.algoClickHandler,props.algoNames)}
      </div>
      <div className={classes2.AlgoControl}>
        <button onClick={props.clickRunHandler}>RUN!</button>
      </div>
    </div>
  );
};

export default buildControls;
