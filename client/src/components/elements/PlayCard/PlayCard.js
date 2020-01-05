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
    images,
    title,
  } = play;

  const href = convertTitleToUrl(title);

  return (
    <Link 
      to={{
        pathname: `/plays/${href}`,
      }}
    >
      <div className='playcard'>
        {title}<br />
        <img src={images[0]} alt={`Actors performing ${title}`}/><br />
      </div>
    </Link>
  )
}

export default PlayCard;