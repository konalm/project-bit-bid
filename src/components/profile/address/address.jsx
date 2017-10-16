import React from 'react';

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

/**
 * Success message JSX
 */
const SuccessMessage = ({props}) => {
  if (!props.successMessage) {
    return null;
  }

  return (
    <div className="row">
      {props.successMessage}
      <br /> <br />
    </div>
  )
}

/**
 * Error message JSX
 */
const ErrorMessage = ({props}) => {
  if (!props.errorMessage) {
    return;
  }

  return (
    <div className="row">
      {props.errorMessage}
      <br /> <br />
    </div>
  )
}

/**
 * Form JSX
 */
const Form = ({props}) => {
  return (
    <form onSubmit={this.submitAddress}>
      <h3> Address </h3>
      <br />
      <div className="row">
        <input
          type="text"
          name="address"
          placeholder="Address line"
          className="form-control"
          value={this.state.addressLine1}
          onChange={this.handleAddressLineChange}
          required
        />
      </div>

      <br />

      <div className="row">
        <input
          type="text"
          name="address-line-2"
          placeholder="Address line 2"
          className="form-control"
          value={this.state.addressLine2}
          onChange={this.handleAddressLine2Change}
        />
      </div>

      <br />

      <div className="row">
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="form-control"
          value={this.state.country}
          onChange={this.handleCountryChange}
          required
        />
      </div>

      <br />

      <div className="row">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="form-control"
          value={this.state.city}
          onChange={this.handleCityChange}
          required
        />
      </div>

      <br />

      <div className="row">
        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          className="form-control"
          value={this.state.postcode}
          onChange={this.handlePostCodeChange}
          required
        />
      </div>

      <br />

      <ErrorMessage props={props} />
      <SuccessMessage props={props} />

      <div className="row">
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  )
}

/**
 * Address JSX
 */
const Address = () => {
  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          <h2>Profile</h2>
          <hr />
        </div>

        <div className="row">
          <ProfileSidebar />

          <div className="col-lg-8">
            <Form props={props} />
          </div>
        </div>
      </div>
    </div>
  )
}

return default Address;
