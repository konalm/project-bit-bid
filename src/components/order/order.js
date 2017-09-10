import React from 'react';

import {http} from '../../http-requests';


class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNo: this.props.match.params.order_no,
      orderInfo: {}
    }

    this.getOrder();
  }

  /**
   * get order
   * redirect if order does not belong to user
   */
  getOrder = () => {
    console.log('get order ()');

    http.get(`order/${this.state.orderNo}`)
      .then(res => {
        console.log('get order -->');
        console.log(res);
      })
  }

  render() {
    return (
      <div>
        <h4>Order Number: </h4>

        <div>
          <h4>Item</h4>
          item title
          item description
          item photos
          item cost
        </div>

        <div>
          <h4>Seller</h4>
          seller name
          seller rating
        </div>

        <div>
          Status: Seller has been alerted to dispatched your item
        </div>
      </div>
    )
  }
}

export default Order;
