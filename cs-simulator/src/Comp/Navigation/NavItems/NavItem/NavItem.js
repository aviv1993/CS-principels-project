import React from "react";
import classes from "./NavItem.module.css";

const navItem = props => (
  <li className={classes.NavItem}>
    <a className={props.active ? classes.active : null} href={props.link}>
      {props.children}
    </a>
  </li>
);

export default navItem;
