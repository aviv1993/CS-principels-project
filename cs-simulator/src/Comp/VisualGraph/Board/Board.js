import React from "react";
import classes from "./Board.module.css";
import Node from "../Node/Node";

const convertArray = (array, row, props) =>
  array.map((elem, col) => (
    <Node
      key={[row, col]}
      row={row}
      col={col}
      nodeClickHandler={props.nodeClickHandler}
      mouseHover={props.mouseHovering}
      onNodeClick={props.onNodeClick}
      runningAlgo={props.runningAlgo}
      isPathAlgo={props.isPathAlgo}
      vertices={props.board}
    />
  ));
const getBoard = (board, props) =>
  board.reduce(
    (acc, curr, row) => acc.concat(convertArray(curr, row, props)),
    []
  );
const board = props => {
  return (
    <div className={classes.Board} onMouseLeave={props.mouseLeave}>
      {getBoard(props.board, props)}
    </div>
  );
};

export default board;
