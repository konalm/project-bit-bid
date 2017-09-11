import React from 'react';
import axios from 'axios';

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
      item: {},
      orderComplete: false,
      userHasAddress: true,
      userHasBilling: true
    }

    this.itemId = this.props.match.params.item_id;
    this.getItem = this.getItem.bind(this);
    this.purchaseJsx = this.purchaseJsx.bind(this);

    this.getItem();
    this.checkUserAddress();

    this.newAddress = false;
    this.address = {};
    this.newPaymentDetails = false;
    this.paymentDetails = {};
  }

  /**
   * check if user has address in DB
   */
  checkUserAddress = () => {
    console.log('check user address');

    http.get('user-address')
      .then(res => {
        if (!res.data.addressLine || !res.data.addressLine2 || !res.data.city ||
          !res.data.country || !res.data.postcode)
        {
          console.log('user does not have address');
          this.setState({userHasAddress: false});
        } else { console.log('user has address'); }
      })
  }

  /**
   * check user has billing details
   */
  checkBilling = () => {
    console.log('check billing !!');

    http.get('user-billing')
      .then(res => {
        if (!res.data.stripeId) {
          console.log('No stripe id');
          this.setState({userHasBilling: false});
          return;
        }

        console.log('stripe');
        console.log('found stripe id');
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
    console.log('payment details callback () PARENT');
    console.log(paymentDetails);
  }

  addressCallback = (address) => {
    this.address = address;
    console.log('address');
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
     console.log('create order !!');

     http.post('handle-order-transaction', {
       itemId: this.state.item._id
     })
     .then(res => {
       console.log('order complete !!');
     })
     .catch(err => {
      console.log('catch ' + err);
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
    let jsxView = '';

    /* only render view if user has address */
    if (this.state.userHasAddress) {
      jsxView = !this.state.orderComplete ?
        this.purchaseJsx(this.state.item) :
        this.purchaseCompleteJsx();
    }

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

export default Purchase;
