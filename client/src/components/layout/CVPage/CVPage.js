import React from 'react';

import './styles.scss';

export default function () {
  return (
    <div className='page-content cv-page'>
      <iframe
        className='cv-page__pdf'
        height="480"
        src="https://drive.google.com/file/d/15S3UP3uT-RZDsoYwfXLHUKbVIspUjopt/preview"
        title="Rem's CV"
        width="640"
      />
    </div>
  )
};
