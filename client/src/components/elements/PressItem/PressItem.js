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
    <blockquote
      cite={url ? url : ''}
    >
      &#8220;{quote}&#8221;
    </blockquote>)

  const publicationToRender = url
    ? <ExternalLink href={url}>{publication}</ExternalLink>
    : publication;

  return (
    <aside>
      {quote && quoteToRender}
      {publicationToRender}
    </aside>
  );
}

export default PressItem;