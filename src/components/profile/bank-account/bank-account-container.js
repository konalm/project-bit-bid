import React from 'react';
import {http} from '../../../http-requests'
import {getStripePubKey} from '../../../globals'

import axios from 'axios'
import View from './bank-account.jsx'

var Stripe = window.Stripe;


class ProfileBankAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: '',
      accountHolder: '',
      accountNumber: '',
      routingNumber: '',
      accountType: 'individual',
      allCurrencies: {},
      user: {}
    }

    this.getAllCurrencies();
    this.getUser();
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

    Stripe.setPublishableKey(getStripePubKey());

    Stripe.bankAccount.createToken({
      country: this.state.user.country,
      currency: this.state.currency,
      account_number: this.state.accountNumber,
      account_holder_name: this.state.accountHolder,
      account_holder_type: this.state.accountType
    }, (status, response) => {
      if (response.error) { throw new Error(response.error); }

      http.post('user-update-stripe-account-debit', {
        bankAccountDetails: response
      })
        .catch(err => { throw new Error(response.error); })
    })
  }

  /**
   * get all exisiting currencies
   */
  getAllCurrencies = () => {
    axios.get(`https://openexchangerates.org/api/currencies.json`)
      .then(res => { this.setState({allCurrencies: res.data}) })
      .catch(err => { throw new Error(err) });
  }

  /**
   * get user
   */
  getUser = () => {
    http.get('user')
    .then(res => { this.setState({user: res.data})})
    .catch(err => { throw new Error(err); })
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
