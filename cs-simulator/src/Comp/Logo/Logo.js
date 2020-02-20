import React from "react";
import logoImage from "../../assests/MyPic/ME.png";
import classes from "./Logo.module.css";
const logo = props => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="MyLogo"></img>
  </div>
);

export default logo;
