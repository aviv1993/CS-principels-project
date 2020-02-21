import React, { Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

const layout = props => (
  <div>
    <Toolbar />
    <main className={classes.Layout}>{props.children}</main>
  </div>
);

export default layout;
