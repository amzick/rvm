import React, { Component } from 'react';
import axios from 'axios';

import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';


class WritingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      writingLinks: []
    };
  }

  componentDidMount() {

    axios.get('/api/writingLinks/')
      .then(({ data }) => {
        const { writingLinks: { links } } = data;
        this.setState({
          writingLinks: links,
          loading: false,
        });
      })
  }

  render() {
    const { loading, writingLinks } = this.state;

    const renderLinks = (array) => {
      return (
        <ul>
          {array.map(({ section, text, url }, idx) => {
            return (
              <li key={`writing-link-${section}-${idx}`}>
                <ExternalLink href={url}>{`${text}`}</ExternalLink>
              </li>
            )
          })}
        </ul>
      )
    };

    let reviewLinks = [];
    let dramaturgyLinks = [];

    if (writingLinks) {
      reviewLinks = writingLinks.filter(({ section }) => section === 'review');
      dramaturgyLinks = writingLinks.filter(({ section }) => section === 'dramaturgy');
    }


    return loading || !writingLinks
      ? <div>Loading ...</div>
      : (
        <div>
          <h2>Writing</h2>
          <p>Preamble</p>
          <h3>Reviews</h3>
          {renderLinks(reviewLinks)}
          <h3>Dramaturgy</h3>
          {renderLinks(dramaturgyLinks)}
        </div>
      )
  }
}

export default WritingsPage;