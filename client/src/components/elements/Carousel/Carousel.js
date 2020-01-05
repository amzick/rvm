import React from 'react';
import ImageGallery from 'react-image-gallery';

import isEmpty from 'lodash/isEmpty';
import './styles.scss';

/*
React Image Gallery
https://github.com/xiaolin/react-image-gallery
*/
const Carousel = ({ images, title }) => {
  if (isEmpty(images) || isEmpty(title)) {
    return null;
  }

  const galleryItems = images.map(url => {
    const altText = `Actors performing in ${title}`;
    return (
      {
        original: url,
        thumbnail: url,
        originalAlt: altText,
        thumbnailAlt: altText
      }
    )
  });

  return <ImageGallery items={galleryItems} />
}

export default Carousel;