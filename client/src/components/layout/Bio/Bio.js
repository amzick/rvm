import React, { Component } from 'react';
import axios from 'axios';

import './styles.scss';

class Bio extends Component {
  constructor(props) {
    super(props);
    const { bio } = props;

    this.state = {
      bio,
      loading: true
    };
  }

  componentDidMount() {
    if (this.state.loading || !this.state.bio) {
      axios.get('/api/infos/rem')
        .then(({ data }) => {
          const { info: { bio } } = data;
          this.setState({
            bio,
            loading: false
          });
        })
    }
  }

  render() {
    const { bio, loading } = this.state;
    return (loading || !bio)
      ? <div>Loading bio</div>
      : (
        <div>
          <img src='/rvm-headshot.jpg' />
          <h2>About</h2>
          <div className='bio' dangerouslySetInnerHTML={{ __html: bio }} />
        </div>
      )
  }
}

export default Bio;