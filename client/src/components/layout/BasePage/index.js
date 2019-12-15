import React, { Component } from 'react';

import SiteHeader from '../../elements/SiteHeader';
import SiteFooter from '../../elements/SiteFooter';

class BasePage extends Component {
  render() {
    return (
      <div>
        <div>Nav (hamburger menu at top of screen on mobile)</div>
        <br />
        <SiteHeader />
        <br />
        <div>Manifesto, Plays or Bio stuff</div> 
        <br />
        <SiteFooter />
      </div>
    )
  }
}

export default BasePage;