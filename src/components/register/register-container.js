import React from 'react';
import Header from '../reuse/header'
import {http} from '../../http-requests'
import RegisterJsx from './register.jsx'

var countries = require('country-list')(); 


class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      feedbackMessage: '',
      successfullyRegistered: false,
      country: countries.getNames()[0]
    }
  }

  /****
    handlers
  ****/
  handleUsernameChange = (event) => {
    console.log('username change');
    this.setState({username: event.target.value});
  }

  handleEmailChange = (event) => {
    console.log('email change');
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
    console.log('passw change');
  }

  handleConfirmPasswordChange = (event) => {
    console.log('confirm passw');
    this.setState({confirmPassword: event.target.value});
  }

  handleCountryChange = (event) => {
    this.setState({country: event.target.value});
  }

  /**
   * use W3C standard regex to validate user email
   */
  emailValidation = () => {
    var regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');

    var match = regex.test(this.state.email);
    if (!match) {this.setState({feedbackMessage: 'invalid email address'}); }

    return match;
  }

  /**
   * validate character length for username and password
   */
  characterLengthValidation = () => {
    if (this.state.username.length < 3) {
      this.setState({
        feedbackMessage: 'username must be at least three characters'
      });

      return false;
    }

    if (this.state.password.length < 6) {
      this.setState({
        feedbackMessage: 'password must be as least 6 characters'
      });

      return false;
    }

    return true;
  }

  /**
   * send register details to the API to create Account
   */
  submitRegister = (event) => {
    event.preventDefault();
    this.setState({feedbackMessage: ''});

    if (!this.emailValidation()) { return; }
    if (!this.characterLengthValidation()) { return; }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({feedbackMessage: 'password confirmation does not match'});
      return;
    }

    http.post('users', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      countryCode: countries.getCode(this.state.country)
    })
      .then(res => { this.setState({successfullyRegistered: true}); })
      .catch(err => {
        if (err.response.status === 403) {
          this.setState({feedbackMessage: err.response.data});
          return;
        }

        throw new Error(err);
       })
  }

  render () {
    return (
      <RegisterJsx
        handleUsernameChange={this.handleUsernameChange}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleConfirmPasswordChange={this.handleConfirmPasswordChange}
        handleCountryChange={this.handleCountryChange}
        submitRegister={this.submitRegister}
        feedbackMessage={this.state.feedbackMessage}
        successfullyRegistered={this.state.successfullyRegistered}
      />
    );
  }
}

export default Register;
