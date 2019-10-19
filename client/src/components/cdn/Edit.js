import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Edit extends Component {
  constructor() {
    super();
  }

  handleLogout = ele => {
    ele.preventDefault();

    localStorage.clear();
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