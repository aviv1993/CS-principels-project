import React from "react";
import ArrayBar from "./ArrayBar/ArrayBar";
import classes from "./VisualizeArray.module.css";
const getBarArray = (realArray, removeBar, runningAlgo, currentActions) =>
  realArray.map((elem, i) => (
    <ArrayBar
      key={elem.toString() + "," + i.toString()}
      removeBar={removeBar}
      num={elem}
      index={i}
      runningAlgo={runningAlgo}
      currentActions={currentActions}
    />
  ));

const visualArray = props => {
  return (
    <div className={classes.VisualizeArray}>
      {getBarArray(
        props.array,
        props.removeBar,
        props.runningAlgo,
        props.currentActions
      )}
    </div>
  );
};

export default visualArray;
