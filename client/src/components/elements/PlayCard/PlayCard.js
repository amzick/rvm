import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const convertTitleToUrl = (title) => {
  return title
    .replace(/[.,/#!$%^@&*;:{}=\-_`~()?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

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

  const href = convertTitleToUrl(title);

  return (
    <Link 
      to={{
        pathname: `/plays/${href}`,
      }}
    >
      <div className='playcard'>
        Title: {title}<br />
        playwright: {playwright}<br />
        about: {about}<br />
        location: {location}<br />
        images: <img src={images[0]}/><br />
        {/* press: {press}<br /> */}
        videos: {videos}<br />
      </div>
    </Link>
  )
}

export default PlayCard;