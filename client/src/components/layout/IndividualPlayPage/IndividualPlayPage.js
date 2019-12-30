import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { get } from 'lodash';

import './styles.scss';

class IndividualPlayPage extends Component {
  constructor(props) {
    super(props);

    const { play } = props;
    this.state = {
      loading: !play,
      play
    };
    this.fetchPlay = this.fetchPlay.bind(this);
  }

  componentDidMount() {
    const { play } = this.state;
    if (!play) {
      this.fetchPlay();
    }
  }

  componentDidUpdate(prevProps) {
    const prevTitle = get(prevProps, 'match.params.title');
    const currentTitle = get(this.props, 'match.params.title');
    if (prevTitle !== currentTitle) {
      this.fetchPlay();
    }
  }

  fetchPlay() {
    const title = get(this.props, 'match.params.title')
      || get(this.props, 'location.pathname').split('/')[2];
    axios.get(`/api/plays/${title}`)
      .then(({ data }) => {
        const { play } = data;
        this.setState({
          loading: false,
          play
        });
      })
  }

  render() {
    const { loading, play } = this.state;

    let about, images, location, press, playwright, title, videos;
    
    play && ({
        about,
        images,
        location,
        press,
        playwright,
        title,
        videos
      } = play);
    

    return loading || !play
      ? <div>Loading Individual Play Page</div>
      : (<div>
        Title: {title}<br />
        playwright: {playwright}<br />
        about: {about}<br />
        location: {location}<br />
        images: <img src={images[0]} /><br />
        {/* press: {press}<br /> */}
        videos: {videos}<br />
      </div>)
  }
}

export default withRouter(IndividualPlayPage);