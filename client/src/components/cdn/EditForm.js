import React, { Component } from 'react';
import axios from 'axios';
import { get, isEqual, merge } from 'lodash';
import moment from 'moment';

import MessagesList from './MessagesList';
import ErrorsList from './ErrorsList';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.initialFormData = merge({}, props.play);
    this.initialFormData._id = this.initialFormData._id || 'new';
    this.state = {
      formData: merge({}, this.initialFormData),
      changesDetected: false,
      errors: [],
      messages: [],
      newImage: '',
      newPress: {
        publication: '',
        quote: '',
        url: ''
      },
      newVideo: '',
      shouldHidePlay: false,
      shouldShowDeleteWarning: false,
    };
  }

  aboutPlaceholder = () => {
    return 'This is where you would enter more information about the play. Will be rendered as HTML so you can use < br /> line breaks, etc. Cast and crew info should go here. Anything else you want';
  }

  arrayMapper = (arr, field, _id) => {
    const fieldSingular = field.substring(0, field.length - 1);

    const stateKeys = {
      images: 'newImage',
      videos: 'newVideo'
    };
    const onChangeFunctions = {
      images: this.handleNewImageUpdate,
      videos: this.handleNewVideoUpdate,
    }

    return (
      <ul>Play {`${field}`}{field === 'images' && ' (At least one required)'}:
        {arr.map((ele, idx) => {
        return (
          <li key={`${field}-${idx}_${_id}`}>
            <label htmlFor={`${field}-${idx}_${_id}`}>{`${fieldSingular} ${idx + 1}`}{idx === 0 && field === 'images' && ' (primary)'}:{' '}</label>
            <input
              id={`${field}-${idx}_${_id}`}
              type="text"
              value={ele}
              onChange={event => this.handleArrayUpdate(event, 'update', `${field}`, idx)}
              style={{ "width": "750px" }}
            />
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveDown', `${field}`, idx)} disabled={idx === (arr.length - 1)}>&#8595;</button>
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveUp', `${field}`, idx)} disabled={idx === 0}>&#8593;</button>
            <button type="button" onClick={event => this.handleArrayUpdate(event, 'remove', `${field}`, idx)}>Remove</button>
          </li>
        );
      })}
        <li key={`${field}-new_${_id}`}>
          <label htmlFor={`${field}-new_${_id}`}>Add {`${fieldSingular}`} (click add before saving play):<br /></label>
          <input
            id={`${field}-new_${_id}`}
            type="text"
            placeholder={`Add ${fieldSingular} urls here`}
            value={this.state[stateKeys[field]]}
            onChange={onChangeFunctions[field]}
            style={{ "width": "750px" }}
          />
          <button type="button" onClick={event => this.handleArrayUpdate(event, 'add', field)}>Add</button>
        </li>
      </ul>
    )
  }

  handleArrayUpdate = (event, type, field, idx) => {
    event.preventDefault();

    const stateString = {
      images: 'newImage',
      videos: 'newVideo'
    }[field];


    const swapElements = (arr, i, i2) => {
      [arr[i], arr[i2]] = [arr[i2], arr[i]];
    };

    const { formData } = this.state;
    switch (true) {
      case (type === 'update'):
        formData[field][idx] = event.target.value;
        break;
      case (type === 'remove'):
        formData[field].splice(idx, 1);
        break;
      case (type === 'add'):
        formData[field].push(this.state[stateString]);
        break;
      case (type === 'moveDown'):
        swapElements(formData[field], idx, idx + 1);
        break;
      case (type === 'moveUp'):
        swapElements(formData[field], idx, idx - 1);
        break;
      default:
        break;
    };

    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    }, () => {
      type === 'add' && this.setState({ [stateString]: '' });
    });
  }

  handleDate = (event) => {
    const { formData } = this.state;
    // dates are dumb
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    formData.date = new Date(event.target.value.replace(/-/g, '/'));

    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    })
  }

  handleNewImageUpdate = event => {
    this.setState({
      newImage: event.target.value,
    });
  }

  handleNewPressUpdate = (event, key, type) => {
    event.preventDefault();

    const { formData, newPress } = this.state;
    switch (true) {
      case type === 'update':
        newPress[key] = event.target.value;
        break;
      case type === 'add':
        formData.press.push(newPress);
        break;
      default:
        break;
    }

    this.setState({
      newPress
    }, () => {
      type === 'add' &&
        this.setState({
          changesDetected: this.hasUpdated(),
          formData,
          newPress: {
            publication: '',
            quote: '',
            url: ''
          },
        });
    });
  }


  handleNewVideoUpdate = event => {
    this.setState({
      newVideo: event.target.value
    })
  }

  handlePressUpdate = (event, key, idx) => {
    const { formData } = this.state;
    formData.press[idx][key] = event.target.value;
    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    });
  }

  hasUpdated = () => {
    return !isEqual(this.initialFormData, this.state.formData);
  }

  isNewPlay = () => {
    return this.initialFormData._id === 'new';
  }

  onChange = (event, field) => {
    const { formData } = this.state;
    formData[field] = event.target.value;

    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    });
  }

  onDelete = (event) => {
    event.preventDefault();
    const { formData: { _id } } = this.state;
    axios.delete(`/api/plays/${_id}`)
      .then(() => {
        console.log('goodbye forever');
        this.setState({
          shouldHidePlay: true
        });
      })
      .catch(error => {
        const data = get(error, 'response.data.errors') || get(error, 'response.data') || {};
        const errors = [];
        for (const key in data) {
          errors.push(data[key]);
        }
        this.setState({ errors })
      });
  }

  onSubmit = event => {
    event.preventDefault();

    const { formData } = this.state;

    const [submitPath, axiosAction, addedPlayHandler] = formData._id === 'new'
      ? ['/api/plays', axios.post, this.props.addedPlayHandler]
      : [`/api/plays/${formData._id}`, axios.patch];
    delete formData._id;

    axiosAction(submitPath, {
      ...formData
    })
      .then((resp) => {
        const { play } = resp.data;
        this.initialFormData = play;
        this.setState({
          formData: merge({}, this.initialFormData),
          messages: ['Play saved!'],
          errors: [],
          newImage: '',
          newPress: {
            publication: '',
            quote: '',
            url: ''
          },
          newVideo: '',
        }, () => {
          this.setState({
            changesDetected: this.hasUpdated()
          });
          addedPlayHandler && addedPlayHandler();
          setTimeout(() => this.setState({ messages: [] }), 1000);
        });
      })
      .catch(error => {
        const data = get(error, 'response.data.errors') || get(error, 'response.data') || {};
        const errors = [];
        for (const key in data) {
          errors.push(data[key]);
        }
        !formData._id && (formData._id = 'new');
        this.setState({
          formData,
          errors
        });
      });
  }

  onReset = event => {
    event.preventDefault();

    this.setState({
      formData: merge({}, this.initialFormData),
      changesDetected: false,
      messages: [],
      errors: [],
      newImage: '',
      newPress: {
        publication: '',
        quote: '',
        url: '',
      },
      newVideo: ''
    });
  }

  toggleCheckbox = (event, key) => {
    const { formData } = this.state;
    formData.types[key] = event.target.checked;
    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    });
  }

  toggleDeleteWarning = (event) => {
    event.preventDefault();
    this.setState({
      shouldShowDeleteWarning: !this.state.shouldShowDeleteWarning
    });
  }

  render() {
    const {
      changesDetected,
      errors,
      messages,
      shouldHidePlay,
      shouldShowDeleteWarning
    } = this.state;
    const {
      _id,
      title,
      playwright,
      location,
      date,
      about,
      images,
      videos,
      types,
      press
    } = this.state.formData;

    const typeLabels = {
      isPlay: 'Plays: ',
      isWriting: 'Dramaturgy: ',
      isYouth: 'Youth: ',
    }

    const playForm = (
      <form
        noValidate
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        style={{ "border": "3px solid black", "marginBottom": "10px" }}
      >
        {_id === 'new' ? 'Add' : 'Edit'} Play:<br />
        {/* title */}
        <label htmlFor={`title_${_id}`}>Title:{' '}</label>
        <input
          id={`title_${_id}`}
          onChange={(event) => this.onChange(event, 'title')}
          type="text"
          value={title}
        />
        {/* playwright */}
        <label htmlFor={`playwright_${_id}`}>Playwright:{' '}</label>
        <input
          id={`playwright_${_id}`}
          onChange={(event) => this.onChange(event, 'playwright')}
          type="text"
          value={playwright}
        />
        {/* location */}
        <label htmlFor={`location_${_id}`}>Location:{' '}</label>
        <input
          id={`location_${_id}`}
          onChange={(event) => this.onChange(event, 'location')}
          type="text"
          value={location}
        />
        {/* date */}
        <label htmlFor={`date_${_id}`}>Date:{' '}</label>
        <input
          id={`date_${_id}`}
          type="date"
          onChange={this.handleDate}
          value={date ? moment(date).format(moment.HTML5_FMT.DATE) : ''}
        /><br />
        {/* about - html */}
        <label htmlFor={`about_${_id}`}>About (html):{' '}</label>
        <textarea
          id={`about_${_id}`}
          onChange={(event) => this.onChange(event, 'about')}
          type="text"
          value={about}
          placeholder={this.aboutPlaceholder()}
          style={{ "width": "750px", "height": "400px" }}
        /><br />
        {/* images */}
        {this.arrayMapper(images, 'images', _id)}
        {/* videos */}
        {this.arrayMapper(videos, 'videos', _id)}
        {/* types */}
        <ul>
          {Object.keys(types).map(key => {
            return (
              <li key={`${key}_${_id}`}>
                <label htmlFor={`${key}_${_id}`}>{typeLabels[key]}</label>
                <input
                  id={`${key}_${_id}`}
                  type="checkbox"
                  checked={types[key]}
                  onChange={(event) => this.toggleCheckbox(event, key)}
                />
              </li>
            );
          })}
        </ul>
        {/* press */}
        Press Mentions (publication required with either a quotation, a link to the article, or both):
        <ul>
          {press.map((pressObj, idx) => {
            return (
              <li key={`press-${idx}_${_id}`}>
                <label htmlFor={`press-${idx}_${_id}_pub`}>Publication: </label>
                <input
                  id={`press-${idx}_${_id}_pub`}
                  type="text"
                  value={pressObj.publication || ''}
                  onChange={(event) => this.handlePressUpdate(event, 'publication', idx)}
                />
                <label htmlFor={`press-${idx}_${_id}_link`}>Link: </label>
                <input
                  id={`press-${idx}_${_id}_link`}
                  type="text"
                  value={pressObj.url || ''}
                  onChange={(event) => this.handlePressUpdate(event, 'url', idx)}
                />
                <br />
                <label htmlFor={`press-${idx}_${_id}_quote`}>Quote (html): </label>
                <textarea
                  id={`press-${idx}_${_id}_quote`}
                  type="text"
                  value={pressObj.quote || ''}
                  onChange={(event) => this.handlePressUpdate(event, 'quote', idx)}
                  style={{ "width": "750px", "height": "133px" }}
                />
                <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveDown', 'press', idx)} disabled={idx === (press.length - 1)}>&#8595;</button>
                <button type="button" onClick={event => this.handleArrayUpdate(event, 'moveUp', 'press', idx)} disabled={idx === 0}>&#8593;</button>
                <button type="button" onClick={event => this.handleArrayUpdate(event, 'remove', 'press', idx)}>Remove</button>
              </li>
            )
          })}
          <li key={`new-press_${_id}`}>
            Add Press Item (click add before saving play):<br />
            <label htmlFor={`new-press-pub_${_id}`}>Publication: </label>
            <input
              id={`new-press-pub_${_id}`}
              type="text"
              value={this.state.newPress.publication}
              onChange={(event) => this.handleNewPressUpdate(event, 'publication', 'update')}
            />
            <label htmlFor={`new-press-url_${_id}`}>Link: </label>
            <input
              id={`new-press-url_${_id}`}
              type="text"
              value={this.state.newPress.url}
              onChange={(event) => this.handleNewPressUpdate(event, 'url', 'update')}
            />
            <br />
            <label htmlFor={`new-press-quote_${_id}`}>Quote (html): </label>
            <textarea
              id={`new-press-quote_${_id}`}
              type="text"
              value={this.state.newPress.quote}
              onChange={(event) => this.handleNewPressUpdate(event, 'quote', 'update')}
              style={{ "width": "750px", "height": "133px" }}
            />
            <button type="button" onClick={(event) => this.handleNewPressUpdate(event, null, 'add')}>Add</button>
          </li>
        </ul>
        {/* changes detected? */}
        {/* save / cancel? */}
        <div>
          <button type="submit" disabled={!changesDetected}>{_id === 'new' ? 'Add Play' : 'Save Changes'}</button>
          <button type="reset" disabled={!changesDetected}>Reset</button>
        </div>
        {/* messages and errors */}
        <MessagesList messages={messages} id={_id} />
        <ErrorsList errors={errors} id={_id} />
        {/* delete */}
        {_id !== 'new' && !shouldShowDeleteWarning && <button onClick={this.toggleDeleteWarning}>Delete Play</button>}
        {shouldShowDeleteWarning &&
          <div>
            {`Are you sure you want to delete ${title}? You can hide plays from displaying and preserve the data by unchecking all types.`}
            <button onClick={this.onDelete}>Yes delete permanently.</button>
            <button onClick={this.toggleDeleteWarning}>Nevermind.</button>
          </div>
        }
      </form>
    )

    return (!shouldHidePlay ? playForm : null);
  }
}

export default EditForm;