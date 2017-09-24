import React from 'react'
import Header from '../reuse/header'

import {http} from '../../http-requests'

import SaleView from './sale.jsx'

class Sale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sale: {},
      item: {},
      buyer: {}
    }

    this.getSale();
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
