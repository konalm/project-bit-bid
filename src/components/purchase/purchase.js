import React from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import requireAuth from '../../requireAuth'
import {http} from '../../http-requests';
import Header from './../reuse/header';
import NotEligibleModal from './not-eligible-modal'

import Address from './address'
import PaymentDetails from './payment-details'

import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');


class Purchase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      item: {},
      orderComplete: false,
      userHasAddress: true,
      userHasBilling: true,
      orderResponse: ''
    }

    this.itemId = this.props.match.params.item_id;
    this.getItem = this.getItem.bind(this);
    this.purchaseJsx = this.purchaseJsx.bind(this);

    this.getItem();

    this.newAddress = false;
    this.address = {};
    this.newPaymentDetails = false;
    this.paymentDetails = {};

    this.checkUserIsLoggedIn();
    this.checkUserAddress();
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
   * check if user has address in DB
   */
  checkUserAddress = () => {
    http.get('user-address')
      .then(res => {
        if (!res.data.addressLine || !res.data.city ||
          !res.data.country || !res.data.postcode)
        {
          this.setState({userHasAddress: false});
        }
      })
  }

  /**
   * check user has billing details
   */
  checkBilling = () => {
    http.get('user-billing')
      .then(res => {
        if (!res.data.stripeId) {
          this.setState({userHasBilling: false});
          return;
        }
      })
  }

  /**
   * get item data from API
   */
  getItem() {
    http.get(`items/${this.itemId}`)
      .then(res => {
        this.setState({item: res.data});
      })
  }

  /***
    callbacks
  ****/
  paymentDetailsCallback = (paymentDetails) => {
    this.paymentDetails = paymentDetails;
  }

  addressCallback = (address) => {
    this.address = address;
  }

  /**
   * handle order transaction
   * call function in address component to handle address
   * call function in payment details component to handle payment details
   * if both address and payment details promises have been resolved then
   * proceed to place order
   */
  handleOrderTransaction = (e) => {
    e.preventDefault();

    this.setState({orderResponse: ''});

    const handleAddressPromise =
      Promise.resolve(this.refs.addressComponent.handleAddressOnOrder())
        .then (res => {
          if (!res) { return false; }

          return true;
        })
        .catch(err => { throw new Error(err); })

    const handlePaymentDetailsPromise =
      Promise.resolve(
        this.refs.paymentDetailsComponent.handlePaymentDetailsOnOrder()
      )
        .then (res => {
          if (!res) { return false; }

          return true;
        })
        .catch(err => { throw new Error(err) })

    Promise.all([handleAddressPromise, handlePaymentDetailsPromise])
      .then((responses) => {
        if (responses[0] && responses[1]) { this.createOrder(); }
      })
      .catch(err => { throw new Error(err) })
  }

  /**
   * create the order
   */
   createOrder = () => {
     http.post('handle-order-transaction', {
       itemId: this.state.item._id
     })
     .then(res => {
      /* redirect to order/orderId */
      this.props.history.push(`/orders/${res.data.data._id}`);
     })
     .catch(err => {
       if (err.response.status === 403) {
        this.setState({orderResponse: 'Sorry, this item has already been sold'});
        return;
      }

      throw new Error(err);
    })
  }

  /**
   * purchase view
   */
  purchaseJsx(item) {
    return (
      <div className="container">
       <div className="row">
         <h1>{item.title}</h1>
         <br />
         {item.category}
         <br />
         {item.description}
         <br />
       </div>

       <br />

       <div className="row">
         <h4> Seller: {item.user && item.user.username} </h4>
         Rating: 8.7
       </div>

       <br />

      <div className="row">
        <Address
          ref="addressComponent"
          passNewAddressToParent={this.addressCallback}
        />
       </div>

       <hr />

       <div className="row">
          <PaymentDetails
            ref="paymentDetailsComponent"
            passPaymentDetailsToParent={this.paymentDetailsCallback}
          />
        </div>

        <hr />
        <br />

         <div className="row">
          <h2>£ {item.price}</h2>
          <button
            className="btn btn-primary"
            onClick={this.handleOrderTransaction}
          >
            Place Order
          </button>
          <br /> <br />

          {this.state.orderResponse}
        </div>
      </div>
    )
  }

  /**
   * purchase complete view
   */
   purchaseCompleteJsx() {
    return (
      <div className="container">
        <h3> Your Order has been complete </h3>
      </div>
    )
  }

  render() {
    if (!this.state.loggedIn) { return null; }

    let jsxView = '';

    jsxView = !this.state.orderComplete ?
      this.purchaseJsx(this.state.item) :
      this.purchaseCompleteJsx();

    return (
      <div>
        <Header />
        {jsxView}
        <NotEligibleModal
          userHasAddress={this.state.userhasAddress}
          userHasBilling={this.state.userHasBilling}
        />
      </div>
    )
  }
}

export default withRouter(Purchase);
