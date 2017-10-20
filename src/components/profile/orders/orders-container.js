import React from 'react'
import { withRouter } from 'react-router-dom'

import requireAuth from '../../../requireAuth'
import {http} from '../../../http-requests'

import View from './orders.jsx'

class orders extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      orders: {}
    }

    this.checkUserIsLoggedIn();
    this.getOrders();
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
   * get all user orders
   */
  getOrders = () => {
    http.get('orders').then(res => {
      this.setState({orders: res.data});
    })
  }

  render() { return <View orders={this.state.orders}/> }
}

export default withRouter(orders);
