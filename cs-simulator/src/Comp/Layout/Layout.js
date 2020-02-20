import React, { Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

const layout = props => (
  <Fragment>
    <Toolbar />
    <main className={classes.Main}>{props.children}</main>
  </Fragment>
);

export default layout;
