import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../../elements/Loading';
import waitAtLeast from '../../helpers/waitAtLeast';

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
      waitAtLeast(axios.get('/api/infos/rem'))
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
      ? <Loading />
      : (
        <div className='page-content bio-page'>
          <h2>About Rem</h2>
          <div className='bio' dangerouslySetInnerHTML={{ __html: bio }} />
          <img className='bio-page__headshot' height='800' width='800' src='https://ik.imagekit.io/rvm/rvm-headshot_xnAY2SP92.jpg' />
        </div>
      )
  }
}

export default Bio;
