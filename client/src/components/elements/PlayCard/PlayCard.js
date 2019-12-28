import React from 'react';

import './styles.scss';

const PlayCard = ({ play }) => {
  if (!play) {
    return null;
  }

  const {
    about,
    images,
    location,
    press,
    playwright,
    title,
    videos
  } = play;

  return(
    <div className='playcard'>
      Title: {title}<br />
      playwright: {playwright}<br />
      about: {about}<br />
      location: {location}<br />
      images: <img src={images[0]}/><br />
      {/* press: {press}<br /> */}
      videos: {videos}<br />
    </div>
  )
}

export default PlayCard;