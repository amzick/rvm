import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    return(
      <nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/plays">Plays</NavLink>
        <NavLink to="/writing">Writing</NavLink>
        <NavLink to="/youth">Youth</NavLink>
      </nav>
    );
  }
}

export default Navigation;
