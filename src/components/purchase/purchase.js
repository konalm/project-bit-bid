import React from 'react';
import axios from 'axios';

import {http} from '../../http-requests';
import Header from './../reuse/header';
import NotEligibleModal from './not-eligible-modal'

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
    this.placeOrder = this.placeOrder.bind(this);
    this.getItem();
    this.checkUserAddress();
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

  /**
   * place order
   */
  placeOrder(e) {
    console.log('order placed !!');
    e.preventDefault();
    this.setState({orderComplete: true});
  }

  /**
   * send item to the API to handle transaction
   */
  handleOrderTransaction = (e) => {
    console.log('handle order transaction');
    e.preventDefault();

    http.post('handle-order-transaction', {
      itemId: this.state.item._id
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
         <h4> Delivery Address </h4>
         <p>United Kingdom</p>
         <p>Birmingham</p>
         <p>B18 7DW</p>
         <p>42 Aberdeen street</p>
       </div>

       <br />

       <div className="row">
         <h2>£ {item.price}</h2>
         <button className="btn btn-primary" onClick={this.handleOrderTransaction}> Order </button>
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

    if (!this.state.userHasAddress || !this.state.userHasBilling) {
      $("#NotEligibleModal").modal();
    }

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
