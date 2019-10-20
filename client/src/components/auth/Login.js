import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from 'lodash';

import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
    };
  }

  onChange = ele => {
    this.setState({
      [ele.target.id]: ele.target.value
    });
  }

  onSubmit = ele => {
    ele.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
    }
      axios
      .post('/api/users/login', userData)
    // fetch('http://localhost:5000/api/users/login', {
    //   method: 'POST',
    //   body: JSON.stringify(userData),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   mode: 'no-cors'
    // })
    .then(res => {
      // save in local storage so user can stay logged in
      // set token in localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // set token to Auth header
      setAuthToken(token);

      // decode token to get data
      const { username: user } = jwt_decode(token);
      localStorage.setItem('user', user);

      // store cookie, then save User, then redirect

      // clear errors
      this.setState({
        errors: {},
      });
      window.location.href='/edit';
    })
    .catch(err => {
      let errors = get(err, 'response.data');
      if (!errors) {
        console.log("Error:", err);
        errors = {};
      }
      this.setState({
        errors
      });
    })
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="username">Username:{' '}</label>
          <input
            onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            id="username"
            type="username"
          />
          <label htmlFor="password">Password:{' '}</label>
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
          />
          <button type="submit">Login</button>
          <br/>
          {this.state.errors.username && <div>{this.state.errors.username}</div>}
          {this.state.errors.password && <div>{this.state.errors.password}</div>}
        </form>
      </div>
    );
  }
}

export default Login;
