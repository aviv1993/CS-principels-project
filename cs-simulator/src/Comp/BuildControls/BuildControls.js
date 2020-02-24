import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import AlgoControl from "./AlgoControl/AlgoControl";
import classes from "./BuildControls.module.css";
import NodeButton from "./NodeButton/NodeButton";
import Slider from "./Slider/Slider";
import { nodeColors } from "../../Containers/GraphController/Constants";

const getNodeButtons = props =>
  nodeColors.map(elem => (
    <NodeButton
      key={elem.color}
      nodeProps={elem}
      nodeTypeHandler={props.nodeTypeHandler}
      currNode={props.currNodeType}
    />
  ));

const getAlgoButtons = (currIndex, handler, algoNames) =>
  algoNames.map((name, i) => (
    <AlgoControl
      key={name}
      algoIndex={i.toString()}
      chosen={i === currIndex}
      name={name}
      clickHandler={handler}
    />
  ));
const getSlider = props => (
  <Slider sliderValue={props.sliderValue} sliderHandler={props.sliderHandler} />
);
const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {props.addHandler === undefined ? null : (
        <div>
          <BuildControl
            label1={"Value:"}
            label2={"Add"}
            inputType={"number"}
            handleFirst={props.addHandler}
            handleSecond={props.addConfirmHandler}
            randomHandler={props.randomHandler}
          />
        </div>
      )}
      {props.addHandler !== undefined ? null : (
        <div className={classes.Random}>
          <button onClick={props.randomHandler}>Random Graph</button>
          <div className={classes.ChooseNode}>{getNodeButtons(props)}</div>
        </div>
      )}
      <div style={{ display: "flex" }}>
        {getAlgoButtons(
          props.currAlgoIndex,
          props.algoClickHandler,
          props.algoNames
        )}
      </div>
      {getSlider(props)}
      <div className={classes.Run}>
        <button onClick={props.clickRunHandler}>RUN!</button>
      </div>
    </div>
  );
};

export default buildControls;
