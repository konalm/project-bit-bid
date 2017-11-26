import React from 'react'
import {Link} from 'react-router-dom'

import {getApiUrl} from '../../../globals'

import moment from 'moment'
import countdown from 'countdown'


/**
 * Item image collection JSX
 */
const ImgCollection = ({props}) => {
  var item = props.item

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
const Seller = ({props}) => {
  var item = props.item
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
 * end date JSX
 */
const EndDateCountdown = ({props}) => {
  const item = props.item;
  var d = new Date(item.bidStats.bidEndDate)

  return (
    <div>
      <p>
        <strong> End Date: </strong>
        {moment(item.bidStats.endDate).format('DD/MM/YYYY')}
      </p>

      <p> {props.countdown} remaining </p>
    </div>
)}

/**
 * bid options with default bids to make
 */
const DefaultBidSelect = ({props}) => {
  if (!props.openBidOptions || props.openCustomBidOption) {
    return null
  }

  const item = props.item
  const currentBid = item.bids.length > 0 ?
    item.bids[0].amount : item.bidStats.startingPrice

  return (
    <div className="row">
      <div className="col-lg-2">
        <select
          className="form-control"
          onChange={(e) => props.handleBidAmount(e)}
        >
          <option value={currentBid * 1.02}>
            £ { (currentBid * 1.02).toFixed(2) }
          </option>

          <option value={currentBid * 1.05}>
            £ { (currentBid * 1.05).toFixed(2) }
          </option>

          <option value={currentBid * 1.10}>
            £ { (currentBid * 1.10).toFixed(2) }
          </option>

          <option value={currentBid * 1.20}>
            £ { (currentBid * 1.20).toFixed(2) }
          </option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-info"
        onClick={(e) => props.toggleOpenCustomBid(e)}
      >
        Custom Bid
      </button>
    </div>
  )
}

/**
 * custom bid input
 */
const CustomBidInput = ({props}) => {
  if (!props.openBidOptions || !props.openCustomBidOption) {
    return null
  }

  return (
    <div className="row">
      <div className="col-lg-4">
        <input type="number"
          className="form-control"
          placeholder="Enter Custom Bid"
          onChange={(e) => props.handleBidAmount(e)}
        />
      </div>

      <button
        className="btn btn-danger mr2"
        onClick={(e) => props.toggleOpenCustomBid(e)}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
)}

/**
 * open bid options on view
 */
const PlaceBid = ({props}) => {
  return (
    <div className="border-top mt4 p3">
      <div className="form-group">
        <DefaultBidSelect props={props} />
        <CustomBidInput props={props} />
      </div>

      <div className="form-group">
        <button
          className="btn btn-primary"
          onClick={(e) => props.createBid()}
        >
          Place Bid
        </button>
      </div>
    </div>
)}

/**
 *
 */
const ItemsChild = (props) => {
  var item = props.item

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

        { item.listingType == 1 &&
          <p> <strong>Price:</strong> {item.price} </p>
        }

        { item.listingType == 2 && item.bids.length > 0 &&
          <p> <strong>Current Bid:</strong> £ {item.bids[0].amount} </p>
        }

        { item.listingType == 2 && item.bids.length === 0 &&
          <p>
            <strong>Starting Price</strong>  £ {item.bidStats.startingPrice }
          </p>
        }

        { item.listingType == 2 &&
          <EndDateCountdown props={props} />
        }

        <Seller props={props} />
        <ImgCollection props={props} />

        <Link to={`/items/${item._id}`}>
          <button className="btn btn-primary mr2"> View </button>
        </Link>

        { item.listingType == 1 &&

          <button
            className="btn btn-primary"
            onClick={(event) => props.goToPurchaseItem(event, item._id)}
          >
            Purchase
          </button>
        }

        { item.listingType == 2 && !props.openBidOptions &&

          <button
            className="btn btn-primary"
            onClick={(event) => props.toggleBidOptions(event, item._id)}
          >
            Make a Bid
          </button>
        }

        { item.listingType == 2 && props.openBidOptions &&

          <button
            className="btn btn-danger"
            onClick={(event) => props.toggleBidOptions(event, item._id)}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        }

        { props.openBidOptions &&
          <PlaceBid props={props} />
        }

        { props.bidFeedback &&
          <p className="feedback mt2"> {props.bidFeedback} </p>
        }
      </div>
    </div>
)}

export default ItemsChild
