import React, { Component } from 'react';
import axios from 'axios';
import { get, isEqual } from 'lodash';

import MessagesList from './MessagesList';
import ErrorsList from './ErrorsList';

class WritingLinkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changesDetected: false,
      errors: [],
      initialWritingLinks: [],
      loading: true,
      messages: [],
      newWritingLink: {
        section: '',
        text: '',
        url: ''
      },
      patchId: '',
      writingLinks: [],
    };
  }

  componentDidMount() {
    axios.get('/api/writingLinks')
      .then(({ data }) => {
        const { writingLinks: { _id, links } } = data;

        this.setState({
          initialWritingLinks: new Array(links),
          loading: false,
          patchId: _id,
          writingLinks: links
        });
      })
      .catch(error => {
        this.setState({
          errors: [error.message]
        });
      });
  }

  arrayMapper = (arr) => {
    return (
      <ul>Dramaturg Links:
        {arr.map((ele, idx) => {
        return (
          <li key={`dramaturg-link-${idx}`}>Dramaturg Link {idx + 1}<br />
            <label htmlFor={`dramaturg-link-text-${idx}`}>Display Text:</label>
            <input
              id={`dramaturg-link-text-${idx}`}
              type="text"
              value={ele.text}
              onChange={event => this.handleArrayUpdate(event, 'update', 'text', idx)}
            />
            <label htmlFor={`dramaturg-link-url-${idx}`}>Url (use full https url when possible):</label>
            <input
              id={`dramaturg-link-url-${idx}`}
              type="text"
              value={ele.url}
              onChange={event => this.handleArrayUpdate(event, 'update', 'url', idx)}
            /><br />
            <label htmlFor={`dramaturg-link-section-${idx}`}>Review or Dramaturgy? (selecting neither will hide):</label>
            <select id={`dramaturg-link-section-${idx}`} value={ele.section} onChange={event => this.handleArrayUpdate(event, 'update', 'section', idx)}>
              <option value=''>none</option>
              <option value='review'>Review</option>
              <option value='dramaturgy'>Dramaturgy</option>
            </select>
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveDown', '', idx)} disabled={idx === (arr.length - 1)}>&#8595;</button>
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveUp', '', idx)} disabled={idx === 0}>&#8593;</button>
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'remove', '', idx)}>Remove</button>
          </li>
        );
      })}
        <li key='dramaturg-link-new'>Add Dramaturg Link (click add before saving all link changes):<br />
          <label htmlFor='dramaturg-link-new'>Display Text:{' '}</label>
          <input
            id='dramaturg-link-text-new'
            type='text'
            placeholder='Enter Display Text here'
            value={this.state.newWritingLink.text}
            onChange={event => this.handleNewWritingLinkUpdate(event, 'text')}
          />
          <label htmlFor='dramaturg-url-new'>Url (use full https link when possible):{' '}</label>
          <input
            id='dramaturg-url-new'
            type='text'
            placeholder='https://...'
            value={this.state.newWritingLink.url}
            onChange={event => this.handleNewWritingLinkUpdate(event, 'url')}
          />
          <label htmlFor={`dramaturg-link-section-new`}>Review or Dramaturgy? (selecting neither will hide):</label>
          <select id={`dramaturg-link-section-new`} value={this.state.newWritingLink.section} onChange={event => this.handleNewWritingLinkUpdate(event, 'section')}>
            <option value=''>none</option>
            <option value='review'>Review</option>
            <option value='dramaturgy'>Dramaturgy</option>
          </select>
          <button type="button" onClick={event => this.handleArrayUpdate(event, 'add')}>Add</button>
        </li>
      </ul>
    );
  }

  hasUpdated = () => {
    return !isEqual(this.state.initialWritingLinks, this.state.writingLinks);
  }

  handleArrayUpdate = (event, type, field, idx) => {
    event.preventDefault();

    const swapElements = (arr, i, i2) => {
      [arr[i], arr[i2]] = [arr[i2], arr[i]];
    };

    const { writingLinks } = this.state;

    switch (true) {
      case (type === 'update'):
        writingLinks[idx][field] = event.target.value;
        break;
      case (type === 'remove'):
        writingLinks.splice(idx, 1);
        break;
      case (type === 'add'):
        writingLinks.push(this.state.newWritingLink)
        break;
      case (type === 'moveDown'):
        swapElements(writingLinks, idx, idx + 1);
        break;
      case (type === 'moveUp'):
        swapElements(writingLinks, idx, idx - 1);
        break;
      default:
        break;
    }

    this.setState({
      changesDetected: this.hasUpdated(),
      writingLinks,
    }, () => {
      type === 'add' && this.setState({ newWritingLink: { url: '', text: '' } });
    });
  }

  handleNewWritingLinkUpdate = (event, field) => {
    event.preventDefault();
    const { newWritingLink } = this.state;
    newWritingLink[field] = event.target.value;
    this.setState({ newWritingLink });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { patchId, writingLinks } = this.state;

    if (!patchId) {
      this.setState({
        errors: ['No Patch Id!!']
      });
      return;
    }
    axios.patch(`/api/writingLinks/${patchId}`, { links: writingLinks })
      .then(({ data }) => {
        const { writingLinks: { links } } = data;

        this.setState({
          errors: [],
          initialWritingLinks: new Array(links),
          messages: ['Links Saved Successfully!'],
          newWritingLink: { text: '', url: '' },
          writingLinks: links
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
      });
  }

  render() {
    const { changesDetected, errors, loading, messages, patchId, writingLinks } = this.state;
    if (loading) {
      return <div>Loading Writing Links</div>
    }

    const returnForm = (
      <form
        noValidate
        onSubmit={this.onSubmit}
        style={{ "border": "3px solid forestgreen", "marginBottom": "10px" }}
      >
        {/* Writing Links */}
        {this.arrayMapper(writingLinks)}
        <button type="submit" disabled={!changesDetected}>Save Changes</button>
        {/* messages and errors */}
        <MessagesList messages={messages} id={patchId} />
        <ErrorsList errors={errors} id={patchId} />
      </form>
    )
    return returnForm;
  }
}

export default WritingLinkForm;
