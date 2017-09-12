import React from 'react'
import Header from '../reuse/header'

import {http} from '../../http-requests'


class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNo: this.props.match.params.order_no,
      order: {},
      item: {},
      seller: {}
    }

    this.getOrder();
  }

  /**
   * get order
   * redirect if order does not belong to user
   */
  getOrder = () => {
    http.get(`orders/${this.state.orderNo}`)
      .then(res => {
        this.setState({
          order: res.data,
          item: res.data.item,
          seller: res.data.seller
        })
      })
      .catch(err => { throw new Error(err); })
  }

  render() {
    const item = this.state.order.item;
    const seller = this.state.order.seller;
    const buyer = this.state.order.buyer;

    return (
      <div>
        <Header />
        <div className="container">
          <h4>Order Number: {this.state.order._id} </h4>
          <br /> <br />
          <div>
            <h4>Item</h4>
            <p> {this.state.item.title} </p>
            <p> {this.state.item.description} </p>
            <p> {this.state.item.condition} </p>
            <p> item photos </p>
            <p> <strong>£ {this.state.item.price}</strong> </p>
          </div>

          <br /> <br />

          <div>
            <h4>Seller</h4>
            <p>{this.state.seller.username}</p>
            <p>7.8</p>
          </div>

          <br /> <br />

          <div>
            <strong>Status:</strong> Seller has been alerted to dispatched your item
          </div>
        </div>
      </div>
    )
  }
}

export default Order;
