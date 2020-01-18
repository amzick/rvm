import React from 'react';

import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';

const facebookIcon = <span className="fab fa-facebook-square"></span>;
// const facebookIcon = (<svg viewBox='0 0 64 64'>
//     <path d="M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z"></path>
//     </svg>)
const instagramIcon = <span className="fab fa-instagram"></span>
const linkedInIcon = <span className="fab fa-linkedin"></span>

const SocialLinks = () => (
    <div className='social-links'>
        <ExternalLink className='social-links__icon' href='https://www.facebook.com/rem.myers'>{facebookIcon}</ExternalLink>
        <ExternalLink className='social-links__icon' href='https://www.instagram.com/remvmyers/'>{instagramIcon}</ExternalLink>
        <ExternalLink className='social-links__icon' href='https://www.linkedin.com/in/rem-m-11b79b161/'>{linkedInIcon}</ExternalLink>
    </div>
)

export default SocialLinks;