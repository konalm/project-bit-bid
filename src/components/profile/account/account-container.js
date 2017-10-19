import React from 'react';
import AccountJsx from './account.jsx'

import {http} from '../../../http-requests'

class Account extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      emailAddress: ''
    }

    this.getUser();
  }

  getUser = () => {
    console.log('get user');

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
    return (
      <AccountJsx
        username={this.state.username}
        emailAddress={this.state.emailAddress}
      />
    )
  }
}

export default Account;
