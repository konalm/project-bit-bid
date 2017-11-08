import React from 'react'
import { withRouter } from 'react-router-dom'

import LoginModalJsx from './login-modal.jsx'

import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * close modal box and redirect to login component
   */
  redirectToLogin = () => {
    $('#loginModal').modal('hide');
    this.props.history.push('/login');
  }

  /**
   * close modal box and redirect to register component
   */
  redirectToRegister = () => {
    $('#loginModal').modal('hide');
    this.props.history.push('/register');
  }

  render() {
    return (
      <LoginModalJsx
        redirectToLogin={this.redirectToLogin}
        redirectToRegister={this.redirectToRegister}
        message={this.props.message}
      />
    )
  }
}

export default withRouter(LoginModal);
