import React from 'react'
import { withRouter } from 'react-router-dom'

import requireAuth from '../../requireAuth'
import {http} from '../../http-requests'

import Header from '../reuse/header'
import SaleView from './sale.jsx'

class Sale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sale: {},
      item: {},
      buyer: {}
    }

    this.checkUserIsLoggedIn();
    this.getSale();
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
   * get sale
   * redirect if sale doesn not belong to user
   */
  getSale = () => {
    http.get(`sales/${this.props.match.params.sale_no}`).then(res => {
      this.setState({
        sale: res.data,
        item: res.data.item,
        buyer: res.data.buyer,
        seller: res.data.seller
      })
    })
    .catch(err => { throw new Error(err); })
  }

  /**
   * update order status too dispatched
   */
  orderDispatched = () => {
    http.put(`order-status-update/${this.props.match.params.sale_no}`, {
      status: 1
    })
      .then(res => { this.getSale(); })
      .catch(err => { throw new Error(err); })
  }

  render () {
    if (!this.state.loggedIn) { return null; }

    return (
      <SaleView
        sale={this.state.sale}
        item={this.state.item}
        buyer={this.state.buyer}
        seller={this.state.seller}
        orderDispatched={() => this.orderDispatched()}
      />
    )
  }
}

export default Sale;
