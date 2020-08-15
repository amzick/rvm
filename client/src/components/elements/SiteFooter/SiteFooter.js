import React from 'react';

// import SocialLinks from '../SocialLinks';
import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';

const SiteFooter = () => {
  return <footer className='site-footer'>
    <div className='site-footer__copyright'>&copy; {new Date().getFullYear()} Rem Myers</div>
    {/* <SocialLinks /> */}
    <div className='site-footer__credit'>Website built by{' '}
      <ExternalLink href='https://github.com/amzick'>
        &#x00040;amzick
      </ExternalLink>
    </div>
  </footer>
};

export default SiteFooter;