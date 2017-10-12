import React from 'react';
import stripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {http} from '../../http-requests'
import {getStripePubKey} from '../../globals'

import Header from '../reuse/header'
import ProfileSidebar from './profile-sidebar'

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

    // Stripe.setPublishableKey(getStripePubKey());

    // Stripe.setPublishableKey('pk_test_1A7DT5FrpPtXH3gDJHgf5Epk');
    // Stripe.setPublishableKey('pk_test_rfNwWQrKTzQnIBcNZf2tM7AZ');

    // let form = this.refs.testform;

    // console.log('submit card');
    //
    // Promise.all([this.createStripeCustomer(), this.createStripeDebitForAccount()])
    //   .then(res => {
    //     this.setState({feedback: 'debit card details updated'});
    //   })
    //   .catch(err => { throw new Error(err) });


    // Stripe.createToken(form, (status, response) => {
    //   console.log('stripejs response --->');
    //   console.log(response);
    //
    //   if (response.error) {
    //     this.setState({feedback: response.error.message});
    //     return;
    //   }
    //
    //   http.post('user-update-stripe', {userCardDetails: response})
    //     .then(response => {
    //       this.resetCardDetails();
    //     })
    //     .catch(err => {
    //       this.setState({feedback: 'There was an issue updating your billing'});
    //     })
    // })
  };

  /**
   * create stripe customer (for giving payment)
   */
  createStripeCustomer = () => {
    console.log('create stripe customer');

    this.createStripeToken().then(res => {
      console.log('response -->');
      console.log(res);

      console.log('API - create customer');

      http.post('create-stripe-customer', {userCardDetails: res})
        .then(res => { this.resetCardDetails(); })
        .catch(err => { throw new Error(err); })
    })
    .catch(err => { this.setState({feedback: err}); });
  };

  /**
   * create stripe account (for recieving payments)
   */
  // createStripeDebitForAccount = () => {
  //   this.createStripeToken().then(res => {
  //     console.log('response -->');
  //     console.log(res);
  //
  //     console.log('API - create account');
  //
  //     // return;
  //
  //     http.post('user-update-stripe-account-debit', {userCardDetails: res})
  //       .then(res => { this.resetCardDetails(); })
  //       .catch(err => { throw new Error(err); })
  //   })
  //   .catch(err => { this.setState({feedback: err}) });
  // };

  /**
   * create stripe token with user debit card
   */
  createStripeToken = () => {
    // Stripe.setPublishableKey('pk_test_rXXahTHmJ1MHiN3fcrQ1oDno');
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

      // Stripe.createToken(form, (status, response) => {
      //   if (response.error) {
      //     this.setState({feedback: response.error.message});
      //     reject(response.error);
      //   }
      //
      //   resolve(response);
      // });


    // Stripe.createToken({
    //   number: 4000056655665556,
    //   cvc: 123,
    //   exp_month: 10,
    //   exp_year: 20,
    //   currency: 'usd'
    // }, (status, response) => {
    //   console.log('token response ---->');
    //   console.log(response);
    // })
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
    const selectCurrency = (
      <div className="form-group">
        <label htmlFor="selectCurrency">
          Currency
        </label>

        <div className="input-group">
          <select className="form-control" onChange={this.handleCurrencyChange}>
            {
              Object.keys(this.state.allCurrencies).map(currency => {
                return (
                  <option value={currency}>
                    {this.state.allCurrencies[currency]}
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
          <div className="row">
            <h2>Profile</h2>
            <hr />
          </div>

          <div className="row">
            <ProfileSidebar />

            <div className="col-lg-8">
              <h3>Card Details</h3>
              <br /> <br />

              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          Card Details
                        </h3>
                      </div>

                      <div className="panel-body">
                        <form role="form" onSubmit={this.submitCard} id="cardDetails" ref="testform">
                          {/* card number */}
                          <div className="form-group">
                            <label htmlFor="cardNumber">
                              CARD NUMBER
                            </label>

                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                id="cardNumber"
                                placeholder={this.state.cardPlaceholder}
                                data-stripe='number'
                                onChange={this.handleNumberChange}
                                value={this.state.cardNumber}
                                required autoFocus
                              />

                              <span className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                              </span>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xs-7 col-md-7">
                              {/* expiration date */}
                              <div className="form-group">
                                <label htmlFor="expityMonth">
                                  EXPIRY DATE
                                </label>

                                {/* expiration month */}
                                <div className="col-xs-6 col-lg-6 pl-ziro">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="expityMonth"
                                    placeholder="MM"
                                    data-stripe='exp-month'
                                    onChange={this.handleExpMonthChange}
                                    value={this.state.expMonth}
                                    required
                                  />
                                </div>

                                {/* expiration year */}
                                <div className="col-xs-6 col-lg-6 pl-ziro">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="expityYear"
                                    placeholder="YY"
                                    data-stripe='exp-year'
                                    onChange={this.handleExpYearChange}
                                    value={this.state.expYear}
                                    required
                                  />
                                </div>
                              </div>
                            </div> {/* col */}

                            <div className="col-xs-5 col-md-5 pull-right">
                              {/* cvc code */}
                              <div className="form-group">
                                <label htmlFor="cvCode">
                                  CV CODE
                                </label>

                                <input
                                  type="password"
                                  className="form-control"
                                  id="cvCode"
                                  placeholder="CVC"
                                  data-stripe='cvc'
                                  onChange={this.handleCvcChange}
                                  value={this.state.cvc}
                                  required
                                />
                              </div>
                            </div> {/* col */}
                          </div> {/* row end */}

                        {selectCurrency}

                          <br/>

                        {/* feedback response */}
                        {this.state.feedback &&
                          <div className="input-group">
                            {this.state.feedback}
                            <br /> <br />
                          </div>
                        }

                          <button
                            type="submit"
                            className="btn btn-success btn-lg btn-block"
                            role="button"
                          >
                            Update Card Details
                          </button>
                        </form>
                      </div> {/* panel body */}
                    </div> {/* panel default */}
                  </div> {/* col */}
                </div> {/* row */ }
              </div> {/* container */}
            </div> {/* col */}
          </div> {/* row */}
        </div> {/* container */}
      </div>
    )
  }
}

export default ProfileBilling;
