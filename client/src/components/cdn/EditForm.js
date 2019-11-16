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

  handleDate = (ele) => {
    const { formData } = this.state;
    // dates are dumb
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    formData.date = new Date(ele.target.value.replace(/-/g, '\/'));

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

  onChange = (ele, field) => {
    const { formData } = this.state;
    formData[field] = ele.target.value;

    this.setState({
      formData,
      changesDetected: this.hasUpdated()
    });
  }

  onSubmit = ele => {
    ele.preventDefault();
  }

  onReset = ele => {
    ele.preventDefault();

    this.setState({
      formData: merge({}, this.initialFormData),
      changesDetected: false
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
          onChange={(ele) => this.onChange(ele, 'title')}
          type="text"
          value={title}
        />
        {/* playwright */}
        <label htmlFor={`playwright_${_id}`}>Playwright:{' '}</label>
        <input
          id={`playwright_${_id}`}
          onChange={(ele) => this.onChange(ele, 'playwright')}
          type="text"
          value={playwright}
        />
        {/* location */}
        <label htmlFor={`location_${_id}`}>Location:{' '}</label>
        <input
          id={`location_${_id}`}
          onChange={(ele) => this.onChange(ele, 'location')}
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
        <label htmlFor="about">About:{' '}</label>
        <textarea
          id={`about_${_id}`}
          onChange={(ele) => this.onChange(ele, 'about')}
          type="text"
          value={about}
        />
        {/* images */}
        {/* videos */}
        {/* types */}
        {/* press */}
        {/* changes detected? */}
        {/* save / cancel? */}
        {changesDetected && <div>
          <button type="submit">Save Changes</button>
          <button type="reset">Reset</button>
        </div>}
        {/* delete */}
      </form>
    )
  }
}

export default EditForm;