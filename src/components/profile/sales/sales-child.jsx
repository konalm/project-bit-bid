import React from 'react'
import {Link} from 'react-router-dom'

import moment from 'moment'

/**
 * Sale JSX
 */
const Sale = ({sale}) => {
  const mainImg = sale.seller ?
    `http://localhost:8080/api/render-item-img/${sale.seller._id}/item/${sale.item._id}/img-path/${sale.item.imgCollection[0]}`
    :
    ``;

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        sale #{sale._id}
      </div>

      <div className="panel-body">
        <p className="lead">{sale.item.title}</p>
        <p><strong>{moment().format('DD/MM/YYYY')}</strong></p>
        <p>{sale.item.description}</p>
        <p className="lead">£{sale.item.price} </p>

        <div className="row ml1">
          <img src= {mainImg} width="70px" />
        </div>

        <Link to={`/sales/${sale._id}`}>
          <button className="btn btn-primary mt3">View Sale</button>
        </Link>
      </div>
    </div>
)}

export default Sale;
