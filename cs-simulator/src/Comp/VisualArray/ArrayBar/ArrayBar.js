import React from "react";
import classes from "./ArrayBar.module.css";
import {
  MAX_BAR,
  BAR_WIDTH
} from "../../../Containers/ArrayController/constants";
const maxValue = 30;
const width = 44;

const arrayBar = props => {
  const height = props.num <= MAX_BAR ? props.num * 20 + MAX_BAR : MAX_BAR * 21;
  const style = {
    height: height,
    width: BAR_WIDTH
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
