import React, { useState, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';

import isEmpty from 'lodash/isEmpty';
import './styles.scss';
import { IMAGE_KIT_EXTERNAL_PATH } from '../../../utils/constants';

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
        original: IMAGE_KIT_EXTERNAL_PATH + url,
        originalAlt: altText,
        thumbnail: IMAGE_KIT_EXTERNAL_PATH + url,
        thumbnailAlt: altText
      }
    )
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