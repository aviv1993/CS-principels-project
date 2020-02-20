import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "../NavItems/NavItem/NavItem";
const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link={"/"} active={true}>
      Array Sorter
    </NavItem>
    <NavItem link={"/"} active={false}>
      Graph Path Finder
    </NavItem>
    <NavItem link={"/"} active={false}>
      About Me
    </NavItem>
  </ul>
);
export default navItems;
