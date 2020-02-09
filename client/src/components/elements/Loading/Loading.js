import React from 'react';

import './styles.scss';

const Loading = () => {
  return (
    <div className='page-content loading-wrapper'>
      <img src='/spinner.svg' alt='loading spinner' />
    </div>
  )
}

export default Loading;
