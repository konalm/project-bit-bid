import React from 'react';

import requireAuth from '../../../requireAuth'
import {http} from '../../../http-requests'
import {getStripePubKey} from '../../../globals'

import axios from 'axios'
import View from './bank-account.jsx'

var Stripe = window.Stripe;


class ProfileBankAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      currency: '',
      accountHolder: '',
      accountNumber: '',
      routingNumber: '',
      accountType: 'individual',
      allCurrencies: {},
      user: {},
      feedback: '',

      accountHolderPlaceholder: '',
      accountNumberPlaceholder: '',
      routingNumberPlaceholder: ''
    }

    this.checkUserIsLoggedIn();
    this.getAllCurrencies();
    this.getUser();
    this.getBankAccount();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
  }

  /*****
    handlers
  *****/
  handleCurrencyChange = (event) => {
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
    this.setState({feedback: ''})

    Stripe.bankAccount.createToken({
      country: this.state.user.country,
      currency: this.state.currency,
      routing_number: this.state.routingNumber,
      account_number: this.state.accountNumber,
      account_holder_name: this.state.accountHolder,
      account_holder_type: this.state.accountType
    }, (status, response) => {
      if (response.error) {
        this.setState({feedback: response.error.message});
        return;
      }

      http.post('user-update-stripe-account-debit', {
        bankAccountDetails: response
      })
        .then(() => {
          this.setState({feedback: 'Bank Account has been updated'})
          this.emptyState();
          this.getBankAccount();
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({feedback: err.response.data})
            return;
          }

          throw new Error(response.error);
        })
    })
  }

  /**
   * get existing account if exisits
   */
  getBankAccount = () => {
    http.get('bank-accounts').then(res => {
      if (res.data.data.length > 0) {
        this.setState({
          accountHolderPlaceholder: res.data.data[0].account_holder_name,
          accountNumberPlaceholder: `****${res.data.data[0].last4}`,
          routingNumberPlaceholder: res.data.data[0].routing_number,
          currency: res.data.data[0].currency
        })
      }
    })
    .catch(err => { throw new Error(err) })
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
    console.log('get user');

    http.get('user')
      .then(res => {
        console.log(res.data);
        this.setState({user: res.data})
      })
      .catch(err => { throw new Error(err); })
  }

  /**
   * empty state
   */
  emptyState = () => {
    this.setState({
      accountHolder: '',
      accountNumber: '',
      routingNumber: '',
    })
  }


  render() {
    if (!this.state.loggedIn) { return null; }

    return (
      <View
        currency={this.state.currency}
        accountHolder={this.state.accountHolder}
        accountNumber={this.state.accountNumber}
        routingNumber={this.state.routingNumber}
        createBankAccount={this.createBankAccount}
        allCurrencies={this.state.allCurrencies}
        feedback={this.state.feedback}

        accountHolderPlaceholder={this.state.accountHolderPlaceholder}
        accountNumberPlaceholder={this.state.accountNumberPlaceholder}
        routingNumberPlaceholder={this.state.routingNumberPlaceholder}

        handleCurrencyChange={this.handleCurrencyChange}
        handleAccountHolderChange={this.handleAccountHolderChange}
        handleAccountNumberChange={this.handleAccountNumberChange}
        handleRoutingNumberChange={this.handleRoutingNumberChange}
        handleAccountTypeChange={this.handleAccountTypeChange}
      />
    )
  }
}

export default ProfileBankAccount;
