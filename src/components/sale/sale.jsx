import React from 'react'

import Header from '../reuse/header'
import {getApiUrl} from '../../globals'


/**
 * Item Img Collection JSX
 */
const ItemImgCollection = ({item, seller}) => {
  if (!item.imgCollection) {
    return null;
  }

  return (
    <div>
      {
        item.imgCollection.map(img => {
          return (
            <div className="col-lg-2">
              <img
                src={`${getApiUrl()}render-item-img/${seller._id}/item/${item._id}/img-path/${img}`}
                height="150px"
              />
            </div>
          )
        })
      }
    </div>
)}

/**
 * Sale Status JSX
 */
const Status = ({status}) => {
  let statusText = '';

  switch (status) {
    case 0:
      statusText = 'Please dispatch item in next 48 hours';
      break;
    case 1:
      statusText = 'Order Is out for Delivery.';
      break;
    case 2:
      statusText = 'Buyer has recieved order successfully.';
  }

  return (<p><strong>Status:</strong> {statusText}</p>);
}

/**
 * Dispatch Item Button JSX
 */
const DispatchItemButton = ({status, props}) => {
  if (status !== 0) {
    return null;
  }

  return (
    <div className="status-button-container mt4">
      <button className="btn btn-primary" onClick={(e) => props.orderDispatched(e)}>
        Item has Been Dispatched
      </button>
    </div>
  );
}

/**
 * Sale JSX
 */
const Sale = (props) => {
  const sale = props.sale, item = props.item, buyer = props.buyer,
    seller = props.seller;

  return (
    <div>
      <Header />

      <div className="container">
        <p className="lead mt2">Sale Number: {sale._id} </p>

        <div className="well">
          <p className="lead"> <strong> {item.title} </strong> </p>
          <p> {item.description} </p>
          <p> {item.condition} </p>

          <div className="row">
            <ItemImgCollection item={item} seller={seller} />
          </div>

          <p className="lead mt4">
            <strong>£ {item.price}</strong>
          </p>
        </div>

        <div className="panel panel-primary p3 mt2">
          <p><strong>Buyer:</strong> {buyer.username}</p>
          <p><strong>Rating:</strong> 7.8</p>
        </div>

        <div className="mt2 mb2">
          <Status status={sale.status} />
          <DispatchItemButton status={sale.status} props={props} />
        </div>
      </div>
    </div>
)}

export default Sale;
