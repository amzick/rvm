import React, { Component } from 'react';
import axios from 'axios';
import { get } from 'lodash';

import MessagesList from './MessagesList';
import ErrorsList from './ErrorsList';

class InfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: '',
      errors: [],
      loading: true,
      messages: [],
      manifesto: ''
    };
  }

  componentDidMount() {
    axios.get('/api/infos/rem')
      .then(({ data }) => {
        const { bio, manifesto } = data.info;
        this.setState({
          bio,
          loading: false,
          manifesto
        });
      })
      .catch(error => {
        this.setState({
          errors: [error.message]
        });
      });
  }

  onChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { bio, manifesto } = this.state;
    axios.patch('/api/infos/rem', {
      bio,
      manifesto,
      username: 'rem'
    })
      .then((resp) => {
        this.setState({
          errors: [],
          messages: ['Info updated!']
        }, () => {
          setTimeout(() => {
            this.setState({ messages: [] })
          }, 1000);
        });
      })
      .catch((error) => {
        const data = get(error, 'response.data.errors') || get(error, 'response.data') || {};
        const errors = [];
        for (const key in data) {
          errors.push(data[key]);
        }
        this.setState({
          errors
        });
      })
  }

  render() {
    const { bio, errors, manifesto, messages } = this.state;
    const returnForm = (
      <form
        noValidate
        onSubmit={this.onSubmit}
        style={{ "border": "3px solid blue", "marginBottom": "10px" }}
      >
        {/* Manifesto */}
        <label htmlFor='manifesto'>Manifesto:{' '}</label>
        <textarea 
          id='manifesto'
          onChange={(event) => this.onChange(event, 'manifesto')}
          style={{ "minHeight" : "250px", "minWidth": "250px" }}
          value={manifesto}
          />
        {/* Bio */}
        <label htmlFor='bio'>Bio:{' '}</label>
        <textarea 
          id='bio'
          onChange={(event) => this.onChange(event, 'bio')}
          style={{ "minHeight" : "250px", "minWidth": "250px" }}
          value={bio}
        />
        {/* messages and errors */}
        <MessagesList messages={messages} id='info' />
        <ErrorsList errors={errors} id='info' />
        {/* buttons */}
        <button type='submit'>Update Info</button>
      </form>
    )
    return (
      returnForm
    )
  }

}

export default InfoForm;
