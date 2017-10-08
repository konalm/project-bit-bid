import React from 'react';
import {http} from '../../../http-requests'
import {getStripePubKey} from '../../../globals'

import axios from 'axios'
import View from './bank-account.jsx'

class ProfileBankAccount extends React.Component {
  constructor() {
    super();

    console.log('profile bank account const');

    this.state = {
      currency: '',
      accountHolder: '',
      accountNumber: '',
      routingNumber: '',
      accountType: 'individual',
      allCurrencies: {}
    }

    this.getAllCurrencies();
  }

  /*****
    handlers
  *****/
  handleCurrencyChange = (event) => {
    console.log('parent -> handle currency change');
    this.setState({currency: event.target.value});
  }

  handleAccountHolderChange = (event) => {
    this.setState({accountHolder: event.target.value});
  }

  handleAccountNumberChange = (event) => {
    this.setState({accountNumber: event.target.value});
  }

  handleRoutingNumberChange = (event) => {
    this.setState({routingNumber: event.target.value})
  }

  handleAccountTypeChange = (event) => {
    this.setState({accountType: event.target.value});
  }

  /**
   * create external account (bank account) in the API for stripe
   */
  createBankAccount = (event) => {
    event.preventDefault();

    console.log('create bank account');

    console.log(this.state.currency);
    console.log(this.state.accountHolder);
    console.log(this.state.accountNumber);
    console.log(this.state.routingNumber);
    console.log(this.state.accountType);
  }

  /**
   * get all exisiting currencies
   */
  getAllCurrencies = () => {
    axios.get(`https://openexchangerates.org/api/currencies.json`)
      .then(res => { this.setState({allCurrencies: res.data}) })
      .catch(err => { throw new Error(err) });
  }

  render() {
    return (
      <View
        handleCurrencyChange={this.handleCurrencyChange}
        handleAccountHolderChange={this.handleAccountHolderChange}
        handleAccountNumberChange={this.handleAccountNumberChange}
        handleRoutingNumberChange={this.handleRoutingNumberChange}
        handleAccountTypeChange={this.handleAccountTypeChange}
        createBankAccount={this.createBankAccount}
        allCurrencies={this.state.allCurrencies}
      />
    )
  }
}

export default ProfileBankAccount;
