import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';

import EditForm from './EditForm';

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errors: [],
      plays: []
    }
  }

  componentDidMount() {
    axios.get('/api/plays')
      .then(({ data }) => {
        this.setState({
          loading: false,
          plays: data.plays
        })
      })
      .catch(errors => {
        this.setState({
          errors: [errors.toString()]
        })
      })
  }

  handleLogout = ele => {
    ele.preventDefault();

    localStorage.clear();
    Cookies.remove('session');
    window.location.href='/';
  }

  render() {
    const { loading } = this.state;
    const errors = this.state.errors.map(err => <div>Error: {err}</div>);
    const plays = this.state.plays.map(play => <EditForm key={play._id} play={play} />);

    return (
      <div className='edit-page'>
        <p>Edit Page</p>
        <button type='button' onClick={this.handleLogout}>Logout</button>
        {(errors.length > 0) && errors}
        {loading ? <div>Loading....</div> : plays}
      </div>
    )
  }
}

export default EditPage;