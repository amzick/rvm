import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../../layout/Navigation';
import SiteHeader from '../../elements/SiteHeader';
import SiteFooter from '../../elements/SiteFooter';
import PlaysPage from '../PlaysPage';

import filterPlays from '../../helpers/filterPlays';

import './styles.scss';

// use switch to render different things based on the nav?
// https://reacttraining.com/react-router/web/guides/quick-start

// SPA:
// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

class BasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      plays: [],
      writing: [],
      youth: []
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      axios.get('/api/plays')
        .then(({ data }) => {
          const { plays: allPlays } = data;
          this.setState({
            plays: filterPlays(allPlays),
            writing: filterPlays(allPlays, 'isWriting'),
            youth: filterPlays(allPlays, 'isYouth')
          }, () => this.setState({ loading: false }));
        })
    }
  }

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
            <PlaysPage plays={this.state.plays}/>
          </Route>
          <Route path='/writing'>
            <PlaysPage plays={this.state.writing}/>
          </Route>
          <Route path='/youth'>
            <PlaysPage plays={this.state.youth}/>
          </Route>
          <br />
          <SiteFooter />
        </div>
      </HashRouter>
    )
  }
}

export default BasePage;