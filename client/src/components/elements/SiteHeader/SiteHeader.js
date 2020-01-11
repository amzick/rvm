import React from 'react';
import { Link } from "react-router-dom";

import './styles.scss';

const SiteHeader = () => (
  <header>
    <Link className='site-header__title' to='/'>
      <h1>Rem Myers</h1>
    </Link>
    <span className='site-header__subtitle'>Play Director and Dramaturg</span>
  </header>
)

export default SiteHeader;