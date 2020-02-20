import React, { Fragment } from "react";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./modal.module.css";

const modal = props => (
  <Fragment>
    <BackDrop show={props.show} backDropClick={props.backDropClick} />
    <div
      className={classes.Modal}
      style={{ transform: props.show ? "translateY(0)" : "translateY(-100vh)" }}
    >
      {props.children}
    </div>
  </Fragment>
);

export default modal;
