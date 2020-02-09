import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';

import EditForm from './EditForm';
import InfoForm from './InfoForm';
import WritingLinkForm from './WritingLinkForm';
import './styles.scss';

const { get } = require('lodash');

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
      displayHelp: false,
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
    window.location.href = '/';
  }

  toggleHelp = (e) => {
    e.preventDefault();
    const { displayHelp } = this.state;
    this.setState({
      displayHelp: !displayHelp
    });
  }

  render() {
    const { loading, displayHelp } = this.state;
    const errors = this.state.errors.map(err => <div key={err}>Error: {err}</div>);
    const plays = this.state.plays.map(play => <EditForm key={play._id || 'new'} play={play} addedPlayHandler={this.addedPlayHandler} />);

    return (
      <div className='edit-page'>
        <button type='button' onClick={this.handleLogout}>Logout</button>
        {(errors.length > 0) && errors}
        <h1>Edit Page</h1><br />
        <h2>Edit Personal Info (html):</h2>
        <InfoForm />
        <h2>Edit Dramaturg Links:</h2>
        <WritingLinkForm />
        <h2>Edit Plays:</h2>
        {loading ? <div>Loading plays....</div> : plays}
        <div className='clippy' onClick={this.toggleHelp}>
          <img
            alt='clippy !'
            src='https://cdn.geekwire.com/wp-content/uploads/2019/05/Clippy.jpg.jpg'
          />click clippy for html advice
        </div>
        <div className={`help` + (displayHelp ? '' : ' hidden')}>
          Html basics:<br />
          -- in about section split up blocks of text with paragraph tags {`<p>paragraph</p>`}<br />
          -- <em>italics</em>:  {`<em>italics</em>`}<br />
          -- <strong>bold</strong>:  {`<strong>bold</strong>`}<br />
          -- insert a return character with {`<br />`}<br />
          -- links - copy this format exactly to link to external websites (introduces security risk):<br />
          {`<a href='(url, use https ALWAYS)' target='_blank' rel='noopener noreferrer'>(display text)</a>`}<br />
          For example,{' '}
          <a href='https://www.amzick.com' target='_blank' rel='noopener noreferrer'>this link</a> looks like this:<br />
          {`<a href='https://www.amzick.com' target='_blank' rel='noopener noreferrer'>this link</a>`}<br />
          You're an elite hacker now!
        </div>
      </div>
    )
  }
}

export default EditPage;