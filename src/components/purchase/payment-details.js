import React from 'react';

import {http} from '../../http-requests';
import {getStripePubKey} from '../../globals';

import $ from 'jquery';
window.jQuery = window.$ = $;

var Stripe = window.Stripe;

class PurchasePaymentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardLastFour: '',
      selectNewCard: false,
      newCard: {},
      previousCardAvailable: false
    }

    this.getUserBilling();
  }

  /**
   * get user Stripe Id and last 4 digits of card
   */
  getUserBilling = () => {
    http.get('user-billing')
      .then(res => {
        if (!res.data.cardLastFour) { return }

        this.setState({cardLastFour: res.data.cardLastFour});
        this.setState({previousCardAvailable: true});
      })
  }

  /**
   * use new card for payment (toggles view to allow entry of new card)
   */
  selectNewCard = (e) => {
    e.preventDefault();

    this.setState({selectNewCard: !this.state.selectNewCard})
  }

  /*****
    handlers
  ****/
  handleNumberChange = (event) => {
    let newCard = Object.assign({}, this.state.newCard);
    newCard.number = event.target.value;

    this.setState({newCard: newCard})
  }

  handleExpMonthChange = (event) => {
    let newCard = Object.assign({}, this.state.newCard);
    newCard.expMonth = event.target.value;

    this.setState({newCard: newCard})
  }

  handleExpYearChange = (event) => {
    let newCard = Object.assign({}, this.state.newCard);
    newCard.expYear = event.target.value;

    this.setState({newCard: newCard})
  }

  handleCvcChange = (event) => {
    let newCard = Object.assign({}, this.state.newCard);
    newCard.cvc = event.target.value;

    this.setState({newCard: newCard})
  }

  /**
   * create stripe token to send to API
   */
  createStripeToken = () => {
    Stripe.setPublishableKey(getStripePubKey());
    const form = this.refs.newCardForm;

    return new Promise((resolve, reject) => {
      Stripe.createToken(form, (status, response) => {
        if (response.error) { reject(response.error); }

        resolve(response);
      });
    });
  }

  /**
   * if using new card for payment ->
   * generate stripe token with user inputed card details
   * send stripe token to the API to purchase item and
   * save stipe customer to user in the API
   */
  handlePaymentDetailsOnOrder = async () => {
    let cardDetails = {}

    if (!this.state.selectNewCard) { return true; }

    try {
      cardDetails = await this.createStripeToken();
    } catch (e) {
      return false;
    }

    return http.post('user-update-stripe', {userCardDetails: cardDetails});
  }

  /**
   * watch state change ->
   * pass state data of new card to parent when updated
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newCard !== this.state.newCard) {
      this.props.passPaymentDetailsToParent(this.state.newCard);
    }
  }

  render() {
    const previousCardContainer =
      this.state.cardLastFour ?
      <div className="panel panel-primary previousCardContainer">
        <div className="panel-body">
          <p> **** **** **** {this.state.cardLastFour} </p>
        </div>
      </div>
      :
      <div> </div>;

    const newCardContainer = this.state.selectNewCard ?
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
                <form role="form" id="cardDetails" ref="newCardForm">
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
                        onChange={this.handleNumberChange}
                        value={this.state.newCard.number}
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
                            value={this.state.newCard.expMonth}
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
                            value={this.state.newCard.expYear}
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
                          value={this.state.newCard.cvc}
                          required
                        />
                      </div>
                    </div> {/* col */}
                  </div> {/* row end */}

                  <br/>

                  {/* validation response */}
                  {this.state.validationResponse &&
                    <div className="input-group">
                      * {this.state.validationResponse}
                      <br /> <br />
                    </div>
                  }

                </form>
              </div> {/* panel body */}
            </div> {/* panel default */}
          </div> {/* col */}
        </div> {/* row */}
      </div>
      :
      <div></div>;

      return (
        <div>
          <h4>Payment Details</h4>
          <div className="row">
            {previousCardContainer}

            {this.state.previousCardAvailable &&
              <button
                className="btn btn-primary"
                onClick={(e) => this.selectNewCard(e)}
              >
                {!this.state.selectNewCard &&
                  <span>New Card</span>
                }

                {this.state.selectNewCard &&
                  <span>Use Previous Card</span>
                }
              </button>
            }
          </div>
          <br />

          <div className="row">
            {newCardContainer}
          </div>
        </div>
      )
    }
}

export default PurchasePaymentDetails;
