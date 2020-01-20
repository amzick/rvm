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
    
    const linksToRender = writingLinks && writingLinks.map(({ text, url }, idx) => {
      return <ExternalLink key={`writing-link-${idx}`} href={url}>{`${text}`}</ExternalLink>
    });
    
    return loading || !linksToRender
      ? <div>Loading ...</div>
      : <div>{linksToRender}</div>
  }
}

export default WritingsPage;