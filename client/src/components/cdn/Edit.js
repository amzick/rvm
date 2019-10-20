import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

class Edit extends Component {
  constructor() {
    super();
  }

  handleLogout = ele => {
    ele.preventDefault();

    localStorage.clear();
    Cookies.remove('session');
    window.location.href='/';
  }

  render() {
    return (
      <div>
        <button type='button' onClick={this.handleLogout}>Logout</button>
        <p>Edit Page</p>
      </div>
    )
  }
}

export default Edit;