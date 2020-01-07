import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { get } from 'lodash';

import Carousel from '../../elements/Carousel';
import PressItem from '../../elements/PressItem';
import VideoPlayer from '../../elements/VideoPlayer';

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
    // const { play } = this.state;
    // if (!play) {
    //   this.fetchPlay();
    // }
    // props are getting mixed up all the time dont have time to figure it out
    // sucks to fetch every time 
    this.fetchPlay();
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
      .catch(errors => {
        console.warn('/// IPP fetchPlay errors', errors);
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

    const pressItems = press.map(press => <PressItem key={`press-item-${press._id}`} press={press} />);
    const videoItems = videos.map(video => <VideoPlayer key={video} video={video} />);
    
    return loading || !play
      ? <div>Loading Individual Play Page</div>
      : (<div className='individual-play-page'>
        <h2>{title}</h2>
        <span className='individual-play-page__playwright'>By {playwright}</span>
        <div className='individual-play-page__about' dangerouslySetInnerHTML={{__html: about}}></div>
        <span className='individual-play-page__location'>{location}</span>
        {<Carousel images={images} title={title} />}
        {((press && press.length) || (videos && videos.length)) && <h3>Media</h3>}
        {press && press.length && pressItems}
        {videos && videos.length && videoItems}
      </div>)
  }
}

export default withRouter(IndividualPlayPage);