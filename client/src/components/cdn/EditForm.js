import React, { Component } from 'react';
import { isEqual, merge } from 'lodash';
import moment from 'moment';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.initialFormData = props.play;
    this.initialFormData._id = this.initialFormData._id || 'new';
    this.state = {
      formData: merge({}, this.initialFormData),
      changesDetected: false
    };
  }

  aboutPlaceholder = () => {
    return 'This is where you would enter more information about the play.Will be rendered as HTML so you can use < br /> line breaks, etc.Cast and crew info should go here.Anything else you want';
  }

  handleDate = (event) => {
    const { formData } = this.state;
    // dates are dumb
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    formData.date = new Date(event.target.value.replace(/-/g, '\/'));

    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    })
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

  onSubmit = event => {
    event.preventDefault();
  }

  onReset = event => {
    event.preventDefault();

    this.setState({
      formData: merge({}, this.initialFormData),
      changesDetected: false
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

  render() {
    const { changesDetected } = this.state;
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

    return (
      <form
        noValidate
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        style={{ "border": "3px solid black", "marginBottom": "10px" }}
      >
        Edit Play:
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
        />
        {/* about - html */}
        <label htmlFor={`about_${_id}`}>About:{' '}</label>
        <textarea
          id={`about_${_id}`}
          onChange={(event) => this.onChange(event, 'about')}
          type="text"
          value={about}
          placeholder={this.aboutPlaceholder()}
        />
        {/* images */}
        {/* videos */}
        {/* types */}
        {Object.keys(types).map(key => {
          return (
            <>
              <label htmlFor={`${key}_${_id}`}>{typeLabels[key]}</label>
              <input
                id={`${key}_${_id}`}
                type="checkbox"
                checked={types[key]}
                onChange={(event) => this.toggleCheckbox(event, key)}
              />
            </>
          );
        })}
        {/* press */}
        {/* changes detected? */}
        {/* save / cancel? */}
        {changesDetected && <div>
          <button type="submit">{_id === 'new' ? 'Add Play' : 'Save Changes'}</button>
          <button type="reset">Reset</button>
        </div>}
        {/* delete */}
      </form>
    )
  }
}

export default EditForm;