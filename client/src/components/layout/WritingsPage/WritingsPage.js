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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at dapibus augue, sed tempus leo. Sed vulputate mi eu turpis bibendum, at interdum diam rhoncus. Aliquam consequat nisi pellentesque nibh porttitor lobortis. Cras lobortis nisi id libero dictum condimentum. Duis vulputate ornare lacus sit amet molestie. Aenean eu justo elit. Duis urna lacus, mattis at risus non, convallis tincidunt orci. Vivamus neque lorem, tristique nec sapien nec, tincidunt aliquam mi.</p>
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