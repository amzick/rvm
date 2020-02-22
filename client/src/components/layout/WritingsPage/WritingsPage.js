import React, { Component } from 'react';
import axios from 'axios';

import ExternalLink from '../../helpers/ExternalLink';
import Loading from '../../elements/Loading';
import waitAtLeast from '../../helpers/waitAtLeast';

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

    waitAtLeast(axios.get('/api/writingLinks/'))
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
        <ul className='writings-page__list'>
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
      ? <Loading />
      : (
        <div className='page-content writings-page'>
          <h2>Writing</h2>
          <p>Rem Myers is a new play dramaturg, a research dramaturg, and a play critic. Below are select examples of his writing.</p>
          <div className='writings-page__container'>
            <div>
              <h3>Reviews</h3>
              {renderLinks(reviewLinks)}
            </div>
            <div>
              <h3>Dramaturgy</h3>
              {renderLinks(dramaturgyLinks)}
            </div>
          </div>
        </div>
      )
  }
}

export default WritingsPage;