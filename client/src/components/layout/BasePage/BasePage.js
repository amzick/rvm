import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Navigation from '../../layout/Navigation';
import SiteHeader from '../../elements/SiteHeader';
import SiteFooter from '../../elements/SiteFooter';
import PlaysPage from '../PlaysPage';

import './styles.scss';

// use switch to render different things based on the nav?
// https://reacttraining.com/react-router/web/guides/quick-start

// SPA:
// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

class BasePage extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navigation />
          <br />
          <SiteHeader />
          <br />
          <Route exact path='/'>
            <p>Manifesto</p>
          </Route>
          <Route path='/about'>
            <p>Bio</p>
          </Route>
          <Route path='/plays'>
            <PlaysPage />
          </Route>
          <Route path='/writing'>
            <PlaysPage />
          </Route>
          <Route path='/youth'>
            <PlaysPage />
          </Route>
          <br />
          <SiteFooter />
        </div>
      </HashRouter>
    )
  }
}

export default BasePage;