import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';

import InfoForm from './InfoForm';
import EditForm from './EditForm';
const { get, merge } = require('lodash');

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.newPlay = {
      _id: 'new',
      title: '',
      playwright: '',
      location: '',
      date: '',
      about: '',
      images: [],
      videos: [],
      types: {
        isPlay: true,
        isWriting: false,
        isYouth: false
      },
      press: []
    }

    this.state = {
      loading: true,
      errors: [],
      plays: [this.newPlay]
    }

    this.addedPlayHandler = this.addedPlayHandler.bind(this);
  }

  componentDidMount() {
    axios.get('/api/plays')
      .then(({ data }) => {
        this.setState({
          loading: false,
          plays: this.state.plays.concat(data.plays)
        })
      })
      .catch(error => {
        const data = get(error, 'response.data') || {};
        const errors = [];
        typeof data === String && errors.push(data);
        this.setState({ errors })
      })
  }

  addedPlayHandler = (play) => {
    // fuck it
    window.location.reload();
    // const { plays } = this.state;
    // this.setState({
    //   loading: true,
    //   plays: [merge({}, this.newPlay)].concat(plays).push(play)
    // }, () => {
    //   this.setState({ loading: false }, this.forceUpdate);
    // });
  }

  handleLogout = ele => {
    ele.preventDefault();

    localStorage.clear();
    Cookies.remove('session');
    window.location.href='/';
  }

  render() {
    const { loading } = this.state;
    const errors = this.state.errors.map(err => <div key={err}>Error: {err}</div>);
    const plays = this.state.plays.map(play => <EditForm key={play._id || 'new'} play={play} addedPlayHandler={this.addedPlayHandler}/>);

    return (
      <div className='edit-page'>
        <button type='button' onClick={this.handleLogout}>Logout</button>
        {(errors.length > 0) && errors}
        <h1>Edit Page</h1><br/>
        <h2>Edit Personal Info (html):</h2>
        <InfoForm />
        <h2>Edit Plays:</h2>
        {loading ? <div>Loading plays....</div> : plays}
      </div>
    )
  }
}

export default EditPage;