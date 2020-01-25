import React, { Component } from "react";
import NavLinks from './NavLinks';

import './styles.scss'

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleMenu = (event) => {
    event.preventDefault();

    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }
  render() {
    const { expanded } = this.state;

    return (
      <nav className='navigation-menu navigation-menu--hamburger'>
        <button
          aria-expanded={expanded}
          className='navigation-menu--hamburger__button'
          onClick={this.toggleMenu}
        >
          Menu
        </button>
        {expanded && <NavLinks />}
      </nav>
    );
  }
}

export default HamburgerMenu;
