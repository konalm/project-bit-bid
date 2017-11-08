import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, withRouter}
  from 'react-router-dom';

import $ from 'jquery';

import './App.css';
import home from './components/Home'
// import itemsListed from './components/ItemsListed'
import items from './components/items'
import item from './components/item'


import profileAccount from './components/profile/account'
import profileAddress from './components/profile/address'
import profileActivity from './components/profile/activity'
import profileMessages from './components/profile/messages'
import profileBilling from './components/profile/billing'
import profileBankAccount from './components/profile/bank-account'
import profileOrders from './components/profile/orders'
import profileSales from './components/profile/sales'
import viewProfile from './components/profile/viewProfile'

import listItem from './components/list-item'
import login from './components/login'
import register from './components/register'
import purchaseItem from './components/purchase/purchase'
import order from './components/order/order'
import sale from './components/sale'

import testC from './components/items'

window.jQuery = window.$ = $;
require('bootstrap');

const requireAuth = (nextState, replace) => {
  console.log('require auth !!');
}


const App = () => (
  <Router>
    <div>
    <Switch>
      <Redirect exact from="/" to="items-listed" component={home} />
      {/* items */}
      <Route path="/items-listed" component={items} />
      <Route path="/items/:itemId" component={item} />
      <Route path="/list-item" component={listItem} />

      {/* profile */}
      <Redirect exact from="/profile" to="/profile/account" />
      <Route path="/profile/account" component={profileAccount} onEnter={requireAuth} />
      <Route path="/profile/activity" component={profileActivity} />
      <Route path="/profile/messages" component={profileMessages} />
      <Route path="/profile/address" component={profileAddress} />
      <Route path="/profile/billing" component={profileBilling} />
      <Route path="/profile/bank-account" component={profileBankAccount} />
      <Route path="/profile/orders" component={profileOrders} />
      <Route path="/profile/sales" component={profileSales} />
      <Route path="/view-profile/:username" component={viewProfile} />

      <Route path="/purchase/:item_id" component={purchaseItem} />
      <Route path="/orders/:order_no" component={order} />
      <Route path="/sales/:sale_no" component={sale} />

      <Route path="/login" component={login} />
      <Route path="/register" component={register} />

      <Route path="/test" component={testC} />
    </Switch>
    </div>
  </Router>
);

export default App;
