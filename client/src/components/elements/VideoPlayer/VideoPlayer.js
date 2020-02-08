import React from 'react';
import ReactPlayer from 'react-player';

import './styles.scss';

// https://www.npmjs.com/package/react-player
// details on how to make responsive ^^
const VideoPlayer = ({ video: url }) => {
  return (
    <div className='video-player__wrapper'>
      <ReactPlayer
        className='react-player'
        controls={true}
        height='100%'
        url={url}
        width='100%'
      />
    </div>
  );
}

export default VideoPlayer;