import React, { Component } from 'react';

import './styles.scss';

class CVPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  }
}

export default CVPage;
