import React from 'react';
import { Link } from "react-router-dom";

import './styles.scss';

const SiteHeader = () => (
  <header>
    <Link className='site-header__title' to='/'>
      <h1>Rem Van&nbsp;Aiken Myers</h1>
    </Link>
    <div className='site-header__subtitle'>Theatre Director and Dramaturg</div>
  </header>
)

export default SiteHeader;