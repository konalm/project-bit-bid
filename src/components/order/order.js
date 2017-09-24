import React from 'react'
import Header from '../reuse/header'

import {http} from '../../http-requests'
import {getApiUrl} from '../../globals'


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
   * update order status too recieved
   */
  orderRecieved = () => {
    http.put(`order-status-update/${this.props.match.params.order_no}`, {
      status: 2
    })
      .then(res => { this.getOrder(); })
      .catch(err => { throw new Error(err); })
  }

  /**
   * get order
   * redirect if order does not belong to user
   */
  getOrder = () => {
    http.get(`orders/${this.state.orderNo}`).then(res => {
        this.setState({
          order: res.data,
          item: res.data.item,
          seller: res.data.seller,
        })
      })
      .catch(err => { throw new Error(err); })
  }

  /**
   * Order Status JSX
   */
  StatusJsx = () => {
    const status = this.state.order.status;
    let statusText = '';

    switch (status) {
      case 0:
      statusText = 'Seller has been alerted to dispatched your item';
      break;
      case 1:
      statusText = 'Your order has been dispatched and is out for delivery';
      break;
      case 2:
      statusText = 'Order completed successfully';
    }

    return (<p><strong>Status:</strong> {statusText}</p>);
  }

  /**
   * order recieved button JSX
   */
  OrderRecievedButtonJsx = () => {
    const status = this.state.order.status;

    if (status !== 1) {
      return null;
    }

    return (
      <div className="status-button-container mt4">
        <button className="btn btn-primary" onClick={(e) => this.orderRecieved(e)}>
          Item has Been Recieved
        </button>
      </div>
    );
  }

  render() {
    const item = this.state.item;
    const seller = this.state.order.seller;
    const buyer = this.state.order.buyer;
    let itemImgCollection = [];

    if (item.imgCollection) {
      itemImgCollection = item.imgCollection.map(img => {
        return (
          <div className="col-lg-2" style={{height: "auto"}}>
            <img
              src={`${getApiUrl()}render-item-img/${this.state.seller._id}/item/${this.state.item._id}/img-path/${img}`}
              height="150px"
            />
          </div>
        )
      });
    }

    const statusJsx = this.StatusJsx();
    const orderRecievedButtonJsx = this.OrderRecievedButtonJsx();

    return (
      <div>
        <Header />

        <div className="container">
          <br /> <br />
          <p className="lead">Order Number: {this.state.order._id} </p>

          <div className="well">
            <p className="lead"> <strong> {this.state.item.title}</strong> </p>
            <p> {this.state.item.description} </p>
            <p> {this.state.item.condition} </p>
            <div className="row">
              {itemImgCollection}
            </div>

            <p className="lead mt1">
              <strong>£ {this.state.item.price}</strong>
            </p>
          </div>

          <div className="panel panel-primary p3 mt2">
            <p><strong>Seller:</strong> {this.state.seller.username}</p>
            <p><strong>Rating:</strong> 7.8</p>
          </div>

          <div className="mt2 mb2">
            {statusJsx}
            {orderRecievedButtonJsx}
          </div>
        </div>
      </div>
    )
  }
}

export default Order;
