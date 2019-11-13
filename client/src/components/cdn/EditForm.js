import React, { Component } from 'react';

import { isEqual, merge } from 'lodash';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.initialFormData = props.play;
    this.state = {
      formData: merge({}, this.initialFormData),
      changesDetected: false
    };
  }

  hasUpdated = () => {
    return !isEqual(this.initialFormData, this.state.formData);
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

        <label htmlFor={`title_${_id}`}>Title:{' '}</label>
        <input
          id={`title_${_id}`}
          onChange={(ele) => this.onChange(ele, 'title')}
          type="text"
          value={title}
        />

        <label htmlFor="playwright">Playwright:{' '}</label>
        <input
          id={`playwright_${_id}`}
          onChange={(ele) => this.onChange(ele, 'playwright')}
          type="text"
          value={playwright}
        />
        {/* location */}
        <label htmlFor="location">Location:{' '}</label>
        <input
          id={`location_${_id}`}
          onChange={(ele) => this.onChange(ele, 'location')}
          type="text"
          value={location}
        />
        {/* date */}
        {/* about - html */}
        <label htmlFor="about">About:{' '}</label>
        <input
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