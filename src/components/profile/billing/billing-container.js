import React from 'react';
import stripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {http} from '../../../http-requests'
import {getStripePubKey} from '../../../globals'

import BillingJsx from './billing.jsx'


import $ from 'jquery';
window.jQuery = window.$ = $;

var Stripe = window.Stripe;
let loadedStripe = false;

class ProfileBilling extends React.Component {
  constructor() {
    super();

    this.state = {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      feeback: '',
      cardPlaceholder: '**** **** **** ****',
      currency: '',
      allCurrencies: {}
    };

    this.getUserBilling();
    this.getAllCurrencies();
  }

  /***
    handlers
  *****/
  handleNumberChange = (event) => {
    console.log('handle number change');

    this.setState({cardNumber: event.target.value});
  }

  handleExpMonthChange = (event) => {
    this.setState({expMonth: event.target.value});
  }

  handleExpYearChange = (event) => {
    this.setState({expYear: event.target.value});
  }

  handleCvcChange = (event) => {
    this.setState({cvc: event.target.value});
  }

  handleCurrencyChange = (event) => {
    this.setState({currency: event.target.value});
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
   * card submitted using stripe elements
   */
  submitCard = (e) => {
    e.preventDefault();
    this.createStripeCustomer();
  };

  /**
   * create stripe customer (for sending payment)
   */
  createStripeCustomer = () => {
    this.createStripeToken().then(res => {
      http.post('create-stripe-customer', {userCardDetails: res})
        .then(res => {
          this.resetCardDetails();
          this.getUserBilling();
        })
        .catch(err => {
          if (err.response.status === 403) {
            this.setState({feedback: err.response.data});
            return;
          }

          throw new Error(err);
        })
    })
    .catch(err => { this.setState({feedback: err.message}); });
  };

  /**
   * create stripe token with user debit card
   */
  createStripeToken = () => {
    Stripe.setPublishableKey(getStripePubKey());

     const cardDetails = {
       number: this.state.cardNumber,
       cvc: this.state.cvc,
       exp_month: this.state.expMonth,
       exp_year: this.state.expYear,
       currency: this.state.currency
     }

    return new Promise((resolve, reject) => {
      Stripe.createToken(cardDetails, (status, response) => {
        if (response.error) { reject(response.error); }

        resolve(response);
      });
    });
  };

  /**
   * reset card details to empty the input fields in the view
   */
  resetCardDetails = () => {
    this.setState({
      feedback: 'your billing was updated successfully',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    });
  }

  /**
   * get user Stripe Id and last 4 digits of card
   */
  getUserBilling = () => {
    http.get('user-billing')
      .then(res => {
        if (res.data.cardLastFour) {
          this.setState({
            cardPlaceholder: `**** **** **** **** ${res.data.cardLastFour}`
          });
        }
      })
  }

  render() {
    return (
      <BillingJsx
        handleCurrencyChange={this.handleCurrencyChange}
        handleNumberChange={this.handleNumberChange}
        handleExpMonthChange={this.handleExpMonthChange}
        handleExpYearChange={this.handleExpYearChange}
        handleCvcChange={this.handleCvcChange}

        allCurrencies={this.state.allCurrencies}
        cardPlaceholder={this.state.cardPlaceholder}
        cardNumber={this.state.cardNumber}
        expMonth={this.state.expMonth}
        expYear={this.state.expYear}
        feedback={this.state.feedback}

        submitCard={this.submitCard}
       />
    )
  }
}

export default ProfileBilling;
