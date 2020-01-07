import React from 'react';
import ReactPlayer from 'react-player';

import './styles.scss';

const VideoPlayer = ({ video: url }) => {
  return (
    <div className='video-player__wrapper'>
      <ReactPlayer
        url={url}
        controls={true}
      />
    </div>
  );
}

export default VideoPlayer;