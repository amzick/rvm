import React from "react";
import { NavLink } from "react-router-dom";

import './styles.scss'

const NAVIGATION_ITEMS = [
  'about',
  'plays',
  'writing',
  'youth'
]

const generateNavLink = (href) => {
  return (
    <li className='navigation-menu-list-item'>
      <NavLink
        activeClassName='navigation-menu-list-item--active'
        key={`navigation-${href}`}
        to={`/${href}`}
      >
        {href}
      </NavLink>
    </li>
  )
}

const NavLinks = () => (
  <ul className='navigation-links-list'>
    {NAVIGATION_ITEMS.map(generateNavLink)}
  </ul>
);

export default NavLinks;