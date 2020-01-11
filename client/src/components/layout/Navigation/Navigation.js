import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import './styles.scss'

class Navigation extends Component {
  render() {
    return (
      <nav className='site-navigation'>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/plays">Plays</NavLink>
        <NavLink to="/writing">Writing</NavLink>
        <NavLink to="/youth">Youth</NavLink>
      </nav>
    );
  }
}

export default Navigation;
