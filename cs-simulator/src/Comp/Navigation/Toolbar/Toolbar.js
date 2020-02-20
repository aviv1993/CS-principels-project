import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import logoImage from "../../../assests/MyPic/ME.png";

const toolBar = props => (
  <header className={classes.Toolbar}>
    <Logo />
    <nav>
      <NavItems />
    </nav>
  </header>
);

export default toolBar;
