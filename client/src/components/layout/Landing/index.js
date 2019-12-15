import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BasePage from '../BasePage';
import isLoggedIn from '../../../utils/isLoggedIn';

class Landing extends Component {
  render() {

    return (isLoggedIn()
      ? <BasePage />
      : <div>
          <p>Under construction!</p>
          <Link to='/login'>Log In</Link>
        </div>
    )
  }
}

export default Landing;