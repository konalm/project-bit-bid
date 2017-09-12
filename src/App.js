import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, withRouter}
  from 'react-router-dom';

import $ from 'jquery';

import './App.css';
import home from './components/Home'
import itemsListed from './components/ItemsListed'
import item from './components/item'

import profile from './components/profile/profile'
import profileAccount from './components/profile/account'
import profileAddress from './components/profile/address'
import profileActivity from './components/profile/activity'
import profileMessages from './components/profile/messages'
import profileBilling from './components/profile/billing'
import viewProfile from './components/profile/viewProfile'

import listItem from './components/listItem'
import login from './components/login'
import register from './components/register'
import purchaseItem from './components/purchase/purchase'
import order from './components/order/order'


window.jQuery = window.$ = $;
require('bootstrap');


const App = () => (
  <Router>
    <div>
    <Switch>
      <Redirect exact from="/" to="items-listed" component={home} />
      {/* items */}
      <Route path="/items-listed" component={itemsListed} />
      <Route path="/items/:itemId" component={item} />
      <Route path="/list-item" component={listItem} />

      {/* profile */}
      <Route exact path="/profile" component={profile} />
      <Route path="/profile/activity" component={profileActivity} />
      <Route path="/profile/messages" component={profileMessages} />
      <Route path="/profile/address" component={profileAddress} />
      <Route path="/profile/account" component={profileAccount} />
      <Route path="/profile/billing" component={profileBilling} />
      <Route path="/view-profile/:username" component={viewProfile} />

      <Route path="/purchase/:item_id" component={purchaseItem} />
      <Route path="/orders/:order_no" component={order} />
      <Route path="/login" component={login} />
      <Route path="/register" component={register} />
    </Switch>
    </div>
  </Router>
);

export default App;
