import React from 'react'

import Header from '../reuse/header'
import {getApiUrl} from '../../globals'

var countries = require('country-list')();


/**
 * select country JSX
 */
const SelectCountry = (props) => {
  return (
    <div className="form-group">
      <label htmlFor="selectCountry" className="col-lg-2 control-label">
        Country
      </label>

      <div className="col-lg-10">
        <select className="form-control" onChange={props.handleCountryChange}>
          {
            countries.getNames().map(country => {
              return (
                <option value={country} onChange={props.handleCountryChange}>
                  {country}
                </option>
              )
            })
          }
        </select>
      </div>
    </div>
  );
}

/**
 * Register JSX
 */
const Register = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Register</h1>
        <hr />

        <form className="form-horizontal"
          onSubmit={(event) => props.submitRegister(event)}
        >
          <fieldset>
            {/* username */}
            <div className="form-group">
              <label htmlFor="inputUserName" className="col-lg-2 control-label">
                User Name
              </label>

              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  placeholder="Unique User Name"
                  onChange={(event) => props.handleUsernameChange(event)}
                  required
                />
              </div>
            </div>

            {/* email */}
            <div className="form-group">
              <label
                htmlFor="inputEmail"
                className="col-lg-2 control-label"
              >
                Email
              </label>

              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  onChange={props.handleEmailChange}
                  required
                />
              </div>
            </div>

            <SelectCountry props={props} />

            {/* password */}
            <div className="form-group">
              <label
                htmlFor="inputPassword"
                className="col-lg-2 control-label"
              >
                Password
              </label>

              <div className="col-lg-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={props.handlePasswordChange}
                  required
                />
              </div>
            </div>

            {/* confirm password */}
            <div className="form-group">
              <label
                htmlFor="inputPassword"
                className="col-lg-2 control-label"
              >
                Confirm Password
              </label>

              <div className="col-lg-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={props.handleConfirmPasswordChange}
                  required
                />
              </div>
            </div>

            {/* sign up */}
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  required
                >
                  Sign up
                </button>
              </div>
            </div>

            {props.feedbackMessage}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Register;
