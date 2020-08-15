import React from 'react';

const ExternalLink = ({ className = '', children, href }) => (
  <a
    className={'external-link' + className}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </a>
);

export default ExternalLink;