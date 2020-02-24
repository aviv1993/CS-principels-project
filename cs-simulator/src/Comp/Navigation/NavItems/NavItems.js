import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "../NavItems/NavItem/NavItem";
const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link={"/array-controller"}>Array Sorter</NavItem>
    <NavItem link={"/"}>Graph Path Finder</NavItem>
    <NavItem link={"/about-me"}>About Me</NavItem>
  </ul>
);
export default navItems;
