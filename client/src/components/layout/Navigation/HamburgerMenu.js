import React, { Component } from "react";
import NavLinks from './NavLinks';
import classnames from 'classnames';

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
          className={
            classnames(
              'navigation-menu--hamburger__button',
              { 'navigation-menu--hamburger__button--expanded': expanded }
            )}
          onClick={this.toggleMenu}
        >
          {expanded ? 'Close' : 'Menu'}
        </button>
        {expanded && <NavLinks />}
      </nav>
    );
  }
}

export default HamburgerMenu;
