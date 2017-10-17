import React from 'react';

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

var countries = require('country-list')();

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
    return null;
  }

  return (
    <div className="row">
      {props.errorMessage}
      <br /> <br />
    </div>
  )
}


/**
 * select country JSX
 */
const SelectCountry = ({props}) => {

  console.log('current country --->');
  console.log(props.country);

  const currentCountry = countries.getName(props.country);
  console.log(currentCountry);

  return (
    <div className="row">
      <select
        className="form-control"
        onChange={props.handleCountryChange}
      >
        {
          countries.getNames().map(country => {
            return (
              <option
                value={country}
                onChange={props.handleCountryChange}
                selected={country === currentCountry}
              >
                {country}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

/**
 * Form JSX
 */
const Form = ({props}) => {
  return (
    <form onSubmit={(event) => props.submitAddress(event)}>
      <h3> Address </h3>
      <br />
      {/* address line */}
      <div className="row">
        <input
          type="text"
          name="address"
          placeholder="Address line"
          className="form-control"
          value={props.addressLine1}
          onChange={props.handleAddressLineChange}
          required
        />
      </div>

      <br />

      {/* address line 2 */}
      <div className="row">
        <input
          type="text"
          name="address-line-2"
          placeholder="Address line 2"
          className="form-control"
          value={props.addressLine2}
          onChange={props.handleAddressLine2Change}
        />
      </div>

      <br />

      {/* country */}
      <SelectCountry props={props} />

      <br />

      {/* city */}
      <div className="row">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="form-control"
          value={props.city}
          onChange={props.handleCityChange}
          required
        />
      </div>

      <br />

      {/* postcode */}
      <div className="row">
        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          className="form-control"
          value={props.postcode}
          onChange={props.handlePostCodeChange}
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
const Address = (props) => {
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

export default Address;
