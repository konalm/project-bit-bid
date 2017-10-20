import React from 'react'
import {http} from '../../http-requests'
import { withRouter } from 'react-router-dom'
import cookies from 'js-cookie'

import LoginJsx from './login.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      feedbackMessage: ''
    }
  }

  /***
    handlers
  ****/
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  /**
   * use W3C standard regex to validate user email
   */
  emailValidation = () => {
    var regex =
      new RegExp(
        '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
      );

    var match = regex.test(this.state.email);
    if (!match) {this.setState({feedbackMessage: 'invalid email address'}); }

    return match;
  }

  /**
   * submit login credentials to the API
   */
  submitLogin = (event) => {
    event.preventDefault();
    this.setState({feedbackMessage: ''});

    if (!this.emailValidation()) { return; }

    http.post(`login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        cookies.set('bit_bid_key', res.data.token);
        window.location.href = '/items-listed';
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.setState({feedbackMessage: err.response.data});
          return;
        }

        throw new Error(err);
      });
  }

  render() {
    return (
      <LoginJsx
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        submitLogin={this.submitLogin}
        feedbackMessage={this.state.feedbackMessage}
      />
    )
  }
}

export default withRouter(Login);
