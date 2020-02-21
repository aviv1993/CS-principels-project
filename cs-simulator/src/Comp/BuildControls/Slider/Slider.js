import React from "react";
import classes from "./Slider.module.css";
const slider = props => (
  <div className={classes.SlideContainer}>
    <output>{props.sliderValue === undefined ? 5 : props.sliderValue}</output>
    <input
      type="range"
      min="5"
      max="500"
      value={props.sliderValue === undefined ? 5 : props.sliderValue}
      className={classes.Slider}
      onChange={props.sliderHandler}
    />
  </div>
);

export default slider;
