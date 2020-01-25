import React from 'react';

const ExternalLink = ({ className = '', children, href }) => (
  <a
    className={!!className && className}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </a>
);

export default ExternalLink;