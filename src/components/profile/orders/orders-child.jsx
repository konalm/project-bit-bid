import React from 'react'
import {Link} from 'react-router-dom'

import moment from 'moment'

/**
 * Order JSX
 */
const Order = ({order}) => {
  const mainImg = order.seller ?
    `http://localhost:8080/api/render-item-img/${order.seller._id}/item/${order.item._id}/img-path/${order.item.imgCollection[0]}`
    :
    ``;

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        order #{order._id}
      </div>

      <div className="panel-body">
        <p className="lead">{order.item.title}</p>
        <p><strong>{moment().format('DD/MM/YYYY')}</strong></p>
        <p>{order.item.description}</p>
        <p className="lead">£{order.item.price} </p>

        <div className="row ml1">
          <img src= {mainImg} width="70px" />
        </div>

        <Link to={`/orders/${order._id}`}>
          <button className="btn btn-primary mt3">View Order</button>
        </Link>
      </div>
    </div>
)}

export default Order;
