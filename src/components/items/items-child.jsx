import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'
import {getApiUrl} from '../../globals'


/**
 * Item image collection JSX
 */
const ImgCollection = ({item}) => {
  return (
    <div className="row mb2">
      { item.imgCollection.map(img => {
        return (
          <div className="col-lg-3">
            <img
              src={`${getApiUrl()}render-item-img/${item.user._id}/item/${item._id}/img-path/${img}`}
              width="200px"
            />
            </div>
  )})}
    </div>
)}

/**
 * Item seller JSX
 */
const Seller = ({item}) => {
  const sellerUsername = item.user ? item.user.username : '';

  return (
    <p>
      <strong>
        Seller:
        <Link to={`/view-profile/${sellerUsername}`}> {sellerUsername} </Link>
      </strong>
    </p>
)}

/**
 * Item JSX
 */
const Item = (props) => {
  const item = props.item;
  item.delivery = item.deliveryMethod === 1 ? 'royal mail' : 'free';

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        {item.title}
      </div>

      <div className="panel-body">
        <p>{item.category}</p>
        <p>{item.description}</p>
        <p>{item.delivery}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Price:</strong> {item.price}</p>

        <Seller item={item} />
        <ImgCollection item={item} />

        <Link to={`/items/${item._id}`}>
          <button className="btn btn-primary mr2"> View </button>
        </Link>

        <button
          className="btn btn-primary"
          onClick={(event) => props.goToPurchaseItem(event, item._id)}
        >
          Purchase
        </button>
      </div>
    </div>
)}


export default Item;
