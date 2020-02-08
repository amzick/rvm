import React, { useState, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';

import isEmpty from 'lodash/isEmpty';
import './styles.scss';

/*
React Image Gallery
https://github.com/xiaolin/react-image-gallery
*/
const MyCarousel = ({ images, title }) => {


  if (isEmpty(images) || isEmpty(title)) {
    return null;
  }

  // for react-image-gallery
  const galleryItems = images.map(url => {
    const altText = `Actors performing in ${title}`;
    return (
      {
        original: url,
        originalAlt: altText,
        thumbnail: url,
        thumbnailAlt: altText
      }
    )
  });

  // for lightbox
  const lightboxImages = images.map(url => {
    return {
      src: url
    }
  });

  return (
    // for react-image-gallery
    <ImageGallery
      additionalClass='individual-play-page__carousel'
      autoPlay={true}
      items={galleryItems}
      lazyLoad={true}
      showThumbnails={false}
      slideInterval={6000}
    />
  )
}

export default MyCarousel;