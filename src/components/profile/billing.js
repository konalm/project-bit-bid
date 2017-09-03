import React from 'react';
import stripeCheckout from 'react-stripe-checkout';
import {http} from '../../http-requests'

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
    };

    this.getUserBilling();
  }

  /**
   * card submitted using stripe elements
   */
  submitCard = (e) => {
    e.preventDefault();

    Stripe.setPublishableKey('pk_test_1A7DT5FrpPtXH3gDJHgf5Epk');
    let form = this.refs.testform;

    Stripe.createToken(form, (status, response) => {
      if (response.error) {
        this.setState({feedback: response.error.message});
        return;
      }

      http.post('user-update-stripe', {userCardDetails: response})
        .then(response => {
          this.setState({
            feedback: 'your billing was updated successfully',
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cvc: ''
          });
        })
        .catch(err => {
          this.setState({feedback: 'There was an issue updating your billing'});
        })
    })
  };

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

  /*****
    handlers
  *****/
  handleCardNumberChange = (e) => {
    this.setState({cardNumber: e.target.value});
  }

  handleExpMonthChange = (e) => {
    this.setState({expMonth: e.target.value})
  }

  handleExpYearChange = (e) => {
    this.setState({expYear: e.target.value});
  }

  handleCvcChange = (e) => {
    this.setState({cvc: e.target.value});
  }

  render() {
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
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                placeholder={this.state.cardPlaceholder}
                                data-stripe='number'
                                onChange={this.handleCardNumberChange}
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
                                    type="text"
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
                                    type="text"
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
