import React from "react";
import { NavLink } from "react-router-dom";

import './styles.scss'

const NAVIGATION_ITEMS = [
  'about',
  'plays',
  'writing',
  // 'youth',
  'cv'
]

const generateNavLink = (href) => {
  return (
    <li className='navigation-menu-list-item' key={`navigation-${href}`}>
      <NavLink
        activeClassName='navigation-menu-list-item--active'
        to={`/${href}`}
      >
        {href === 'cv' ? 'CV' : href}
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