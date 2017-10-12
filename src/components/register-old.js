import React from 'react';
import Header from './reuse/header'

import {http} from '../http-requests'

var countries = require('country-list')();

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      country: countries.getNames()[0]
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  /****
    handlers
  ****/
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleCountryChange = (event) => {
    this.setState({country: event.target.value});
  }

  /**
   * send register details to the API to create Account
   */
  submitRegister(e) {
    e.preventDefault();

    http.post('users', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      countryCode: countries.getCode(this.state.country)
    })
      .then(res => {
        console.log('register response --');
        console.log(res)
      })
  }

  render () {
    const selectCountry = (
      <div className="form-group">
        <label htmlFor="selectCountry" className="col-lg-2 control-label">
          Country
        </label>

        <div className="col-lg-10">
          <select className="form-control" onChange={this.handleCountryChange}>
            {
              countries.getNames().map(country => {
                return (
                  <option value={country} onChange={this.handleCountryChange}>
                    {country}
                  </option>
                )
              })
            }
          </select>
        </div>
      </div>
    );

    return (
      <div>
      <Header />
      <div className="container">
        <h1>Register</h1>
        <hr />

        <form className="form-horizontal">
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
                  onChange={this.handleUsernameChange}
                />
              </div>
            </div>

            {/* email */}
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-lg-2 control-label">Email</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                   placeholder="Email"
                   onChange={this.handleEmailChange}
                />
              </div>
            </div>

            { selectCountry }

            {/* password */}
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-lg-2 control-label">Password</label>
              <div className="col-lg-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>

            {/* sign up */}
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-primary" onClick={this.submitRegister}>
                  Sign up
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      </div>
    )
  }
}

export default Register;
