import React from 'react';

import isEmpty from 'lodash/isEmpty';
import './styles.scss';

const AmpCarousel = ({ images, title }) => {
  if (isEmpty(images) || isEmpty(title)) {
    return null;
  }

  const carouselItems = images.map(url => {
    return (
      <amp-img
        alt={`Actors performing in ${title}`}
        src={url}
        width='286'
        height='191'
        layout='responsive'
      ></amp-img>
    )
  })

  return (
    <amp-carousel
      width='286'
      height='191'
      layout='responsive'
      type='slides'
    >
      {carouselItems}
    </amp-carousel>);
}

export default AmpCarousel;