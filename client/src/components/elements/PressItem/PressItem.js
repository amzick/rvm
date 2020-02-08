import React from 'react';

import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';

// block quotes (what we'll be using) vs pull quotes
// https://www.smashingmagazine.com/2008/06/block-quotes-and-pull-quotes-examples-and-good-practices/

const PressItem = ({ press }) => {
  const { publication, quote, url } = press;
  const hasQuoteOrUrl = !!quote || !!url;
  if (!publication || !hasQuoteOrUrl) {
    return null;
  }

  const quoteToRender = (
    <blockquote cite={publication}>
      {/* doing quotes with css now */}
      {/* <span>&#8220;</span> */}
      {quote}
      {/* <span>&#8221;</span> */}
    </blockquote>)

  const publicationToRender = url
    ? <ExternalLink href={url}>{publication}</ExternalLink>
    : publication;

  return (
    <aside className='press-item'>
      {quote && quoteToRender}
      -- {publicationToRender}
    </aside>
  );
}

export default PressItem;