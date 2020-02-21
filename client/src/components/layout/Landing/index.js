import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BasePage from '../BasePage';
import isLoggedIn from '../../../utils/isLoggedIn';

class Landing extends Component {
  render() {
    return (process.env.REACT_APP_UNDER_CONSTRUCTION === 'true' && !isLoggedIn()
      ? <div>
        <p>Under construction!</p>
        <Link to='/login'>Log In</Link>
      </div>
      : <BasePage {...this.props} />
    )
  }
}

export default Landing;