import React from 'react'
import {http} from '../../../http-requests'

import View from './orders.jsx'

class orders extends React.Component {
  constructor() {
    super();

    this.state = {
      orders: {}
    }

    this.getOrders();
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

export default orders;
