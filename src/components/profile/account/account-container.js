import React from 'react';
import { withRouter } from 'react-router-dom'

import AccountJsx from './account.jsx'

import requireAuth from '../../../requireAuth'
import {http} from '../../../http-requests'

class Account extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: '',
      emailAddress: ''
    }

    this.checkUserIsLoggedIn();
    this.getUser();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
  }

  /**
   * get user data
   */
  getUser = () => {
    http.get('user').then(res => {
      console.log(res);
      this.setState({
        username: res.data.username,
        emailAddress: res.data.email
      })
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  render() {
    if (!this.state.loggedIn) { return null; }

    return (
      <AccountJsx
        username={this.state.username}
        emailAddress={this.state.emailAddress}
      />
    )
  }
}

export default withRouter(Account);
