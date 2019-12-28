import React, { Component } from 'react';
import axios from 'axios';

import PlayCard from '../../elements/PlayCard'

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

      axios.get('/api/plays')
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
    ? <div>Loading ...</div>
    : plays.map(play => <PlayCard key={`playcard-${play._id}`} play={play} />)
  }
}

export default PlaysPage;