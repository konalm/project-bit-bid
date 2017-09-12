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
   * get order
   * redirect if order does not belong to user
   */
  getOrder = () => {
    http.get(`orders/${this.state.orderNo}`)
      .then(res => {
        console.log(res.data.item);

        this.setState({
          order: res.data,
          item: res.data.item,
          seller: res.data.seller,
        })
      })
      .catch(err => { throw new Error(err); })
  }

  render() {
    const item = this.state.item;
    const seller = this.state.order.seller;
    const buyer = this.state.order.buyer;
    let itemImgCollection = [];

    console.log('item --->');
    console.log(item);

    if (item.imgCollection) {
      itemImgCollection = item.imgCollection.map(img => {
        return (
          <div className="col-lg-3" style={{height: "200px"}}>
            <img
              src={`${getApiUrl()}render-item-img/${this.state.seller._id}/item/${this.state.item._id}/img-path/${img}`}
              width="200px"
            />
          </div>
        )
      });
    }


    return (
      <div>
        <Header />
        <div className="container">
          <h3>Order Number: {this.state.order._id} </h3>
          <br /> <br />
          <div className="row well">
            <h4> {this.state.item.title} </h4> <br />
            <p> {this.state.item.description} </p>
            <p> {this.state.item.condition} </p>

            <div style={{width: "100%", height: "200px"}}>
              {itemImgCollection}
            </div>
            <br />
            <h4> <strong>£ {this.state.item.price}</strong> </h4>
          </div>

          <br /> <br />

          <div className="panel panel-primary px-5">
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
