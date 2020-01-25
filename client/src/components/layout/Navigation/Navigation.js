import React, { Component } from "react";
import NavLinks from './NavLinks';

import './styles.scss'

class Navigation extends Component {
  render() {
    return (
      <nav className='navigation-menu navigation-menu--desktop'>
        <NavLinks />
      </nav>
    );
  }
}

export default Navigation;
