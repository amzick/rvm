import React from 'react';

import SocialLinks from '../SocialLinks';
import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';

const SiteFooter = () => (
  <footer className='site-footer'>
    <p>built by{' '}
      <ExternalLink href='https://github.com/amzick'>
        &#x00040;amzick
      </ExternalLink>
    </p>
    <SocialLinks />
  </footer>
)

export default SiteFooter;