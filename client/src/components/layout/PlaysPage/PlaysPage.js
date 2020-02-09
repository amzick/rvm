import React, { Component } from 'react';
import axios from 'axios';

import PlayCard from '../../elements/PlayCard'
import Loading from '../../elements/Loading';
import waitAtLeast from '../../helpers/waitAtLeast';

import { isEmpty } from 'lodash';
import filterPlays from '../../helpers/filterPlays';

import './styles.scss';

class PlaysPage extends Component {
  constructor(props) {
    super(props);

    const { plays = [] } = props;
    this.state = {
      loading: isEmpty(plays),
      plays
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.plays)) {
      const key = window.location.href.split('/').reverse()[0];
      const keys = {
        plays: 'isPlay',
        writing: 'isWriting',
        youth: 'isYouth'
      };

      waitAtLeast(axios.get('/api/plays'))
        .then(({ data }) => {
          const { plays } = data;
          this.setState({
            loading: false,
            plays: filterPlays(plays, keys[key])
          })
        })
    }
  }

  render() {
    const { loading, plays } = this.state;

    return loading
      ? <Loading />
      : (<div className='plays-page-canvas'>
        <p>Below you can find photos, videos, and reviews from several of Rem Myers’ directed plays. For a complete list of plays, please view his CV.</p>
        {plays.map(play => <PlayCard key={`playcard-${play._id}`} play={play} />)}
      </div>)
  }
}

export default PlaysPage;
