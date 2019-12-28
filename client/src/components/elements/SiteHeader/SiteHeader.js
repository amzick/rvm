import React from 'react';
import { Link } from "react-router-dom";

import './styles.scss';

const SiteHeader = () => (
  <header>
    <Link to='/'>
      <h1>Rem Myers</h1>
    </Link>
    <span className='header__subtitle'>Play Director and Dramaturg</span>
  </header>
)

export default SiteHeader;