import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Bio from '../Bio';
import CVPage from '../CVPage';
import { HamburgerMenu } from '../Navigation';
import IndividualPlayPage from '../IndividualPlayPage';
import Manifesto from '../Manifesto';
import { Navigation } from '../Navigation';
import PlaysPage from '../PlaysPage';
import WritingsPage from '../WritingsPage';
import SiteFooter from '../../elements/SiteFooter';
import SiteHeader from '../../elements/SiteHeader';

import filterPlays from '../../helpers/filterPlays';

import './styles.scss';


function convertTitleToUrl(title) {
  return title
    .replace(/[.,/#!$%^@&*;:{}=\-_`~()?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

// use switch to render different things based on the nav?
// https://reacttraining.com/react-router/web/guides/quick-start

// SPA:
// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

class BasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: '',
      individualPlay: undefined,
      loadingInfo: true,
      loadingPlays: true,
      manifesto: '',
      plays: [],
      writing: [],
      youth: []
    }
  }

  componentDidMount() {
    if (this.state.loadingPlays) {
      axios.get('/api/plays')
        .then(({ data }) => {
          const { plays: allPlays } = data;

          // for the life of me I can't pass the url params as a prop so here we are, fucking sucks
          let individualPlay;
          if (window.location.href.split('/')[5]) {
            const titleKebab = window.location.href.split('/')[5];
            individualPlay = allPlays.find(({ title }) => {
              return titleKebab === convertTitleToUrl(title);
            });
          }

          this.setState({
            individualPlay,
            loadingPlays: false,
            plays: filterPlays(allPlays),
            writing: filterPlays(allPlays, 'isWriting'),
            youth: filterPlays(allPlays, 'isYouth')
          });
        })
    }

    if (this.state.loadingInfo) {
      axios.get('/api/infos/rem')
        .then(({ data }) => {
          const { info: { bio, manifesto } } = data;
          this.setState({
            bio,
            loading: false,
            manifesto
          });
        })
    }
  }

  render() {
    const { bio, manifesto } = this.state;

    return (
      <HashRouter>
        <div className='main-content-wrapper'>
          <HamburgerMenu />
          <SiteHeader />
          <Navigation />
          <Route exact path='/'>
            <Manifesto manifesto={manifesto} />
          </Route>
          <Route path='/about'>
            <Bio bio={bio} />
          </Route>
          <Route exact path='/plays'>
            <PlaysPage plays={this.state.plays} />
          </Route>
          <Route path='/writing'>
            {/* <PlaysPage plays={this.state.writing} /> */}
            <WritingsPage />
          </Route>
          {/* <Route path='/youth'>
            <PlaysPage plays={this.state.youth} />
          </Route> */}
          <Route path='/cv'>
            <CVPage />
          </Route>
          <Route path='/plays/:title'>
            {this.state.loadingPlays
              ? <div>LoadingPlays ...</div>
              : <IndividualPlayPage play={this.state.individualPlay} />}
          </Route>
          <br />
          <div className='main-content-wrapper__push' />
        </div>
        <SiteFooter />
      </HashRouter>
    )
  }
}

export default BasePage;