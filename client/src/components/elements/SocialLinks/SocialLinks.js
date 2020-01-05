import React from 'react';

import ExternalLink from '../../helpers/ExternalLink';

import './styles.scss';

const facebookIcon = <span className="fab fa-facebook-square"></span>;
const instagramIcon = <span class="fab fa-instagram"></span>
const linkedInIcon = <span class="fab fa-linkedin"></span>

const SocialLinks = () => (
    <div className='social-links'>
    <ExternalLink href='https://www.facebook.com/rem.myers'>{facebookIcon}</ExternalLink>
    <ExternalLink href='https://www.instagram.com/remvmyers/'>{instagramIcon}</ExternalLink>
    <ExternalLink href='https://www.linkedin.com/in/rem-m-11b79b161/'>{linkedInIcon}</ExternalLink>
    </div>
)

export default SocialLinks;