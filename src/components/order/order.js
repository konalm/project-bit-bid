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
          <div className="col-lg-2" style={{height: "auto"}}>
            <img
              src={`${getApiUrl()}render-item-img/${this.state.seller._id}/item/${this.state.item._id}/img-path/${img}`}
              height="150px"
            />
          </div>
        )
      });
    }


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

              <br />

              <p className="lead">
                <strong>£ {this.state.item.price}</strong>
              </p>
            </div>

          <br /> <br />

          <div className="panel panel-primary p3">
            <p><strong>Seller:</strong> {this.state.seller.username}</p>
            <p><strong>Rating:</strong> 7.8</p>
          </div>

          <br /> <br />

          <div>
            <p>
              <strong>Status:</strong> Seller has been alerted to dispatched your item
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Order;
