import React from "react";
import classes from "./ArrayBar.module.css";

const maxValue = 30;
const width = 44;

const arrayBar = props => {
  const style = {
    height: props.num <= maxValue ? props.num * 20 + maxValue : maxValue * 21,
    width: width
  };
  const isChosenAndMarked =
    props.runningAlgo &&
    props.currentActions != null &&
    (props.currentActions["action"][0] === props.index ||
      props.currentActions["action"][1] === props.index) &&
    props.currentActions["marked"];
  let chosenStyle = classes.ArrayBar;

  if (isChosenAndMarked) {
    chosenStyle = classes.Chosen;
  }

  return (
    <div
      className={chosenStyle}
      style={style}
      onClick={() => props.removeBar(props.index)}
    >
      {props.num}
    </div>
  );
};

export default arrayBar;
