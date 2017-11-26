import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

import PropTypes from 'prop-types'
import {getApiUrl} from '../../globals'

import countdown from 'countdown'


class Item extends React.Component {
  constructor() {
    super()

    this.state = {
      countdown: '',
      openBidOptions: false,
      openCustomBidOption: false
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  /**
   * set countdown state till end date on every tick running
   * every second
   */
  tick = () => {
    var d = new Date(this.props.item.bidStats.bidEndDate)
    this.setState({countdown: countdown(d).toString() })
  }

  /**
   * Item image collection JSX
   */
  ImgCollection = () => {
    var item = this.props.item

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
Seller = () => {
  var item = this.props.item
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
  EndDateCountdown = () => {
    const item = this.props.item;
    var d = new Date(item.bidStats.bidEndDate)

    return (
      <div>
        <p>
          <strong> End Date: </strong>
          {moment(item.bidStats.endDate).format('DD/MM/YYYY')}
        </p>

        <p> {this.state.countdown} remaining </p>
      </div>
  )}

  /**
   * open bid options on view
   */
  placeBid = () => {
    return (
      <div className="border-top mt4 p3">
        <div className="form-group">

          {/* bid options with default bids to make */}
          { this.state.openBidOptions &&
            !this.state.openCustomBidOption &&

            <div className="row">
              <div className="col-lg-2">
                <select className="form-control">
                  <option> £2.00 </option>
                  <option> £5.00 </option>
                  <option> £10.00 </option>
                  <option> £20.00 </option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => this.toggleOpenCustomBid(e)}
              >
                Custom Bid
              </button>
            </div>
          }

          {/* bid options with custom bid to make */}
          { this.state.openBidOptions &&
            this.state.openCustomBidOption &&

            <div className="row">
              <div className="col-lg-4">
                <input type="text" className="form-control" />
              </div>

              <button
                className="btn btn-danger mr2"
                onClick={(e) => this.toggleOpenCustomBid(e)}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          }
        </div>

        <div className="form-group">
          <button className="btn btn-primary"> Place Bid </button>
        </div>
      </div>
    )
  }

  /**
   * toggle open bid options
   */
  toggleBidOptions = () => {
    this.setState({
      openBidOptions: !this.state.openBidOptions
    })
  }

  /**
   * toggle open custom bid input
   */
  toggleOpenCustomBid = () => {
    this.setState({
      openCustomBidOption: !this.state.openCustomBidOption
    })
  }

  render() {
    const item = this.props.item;
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

          { item.listingType == 1 &&
            <p> <strong>Price:</strong> {item.price} </p>
          }

          { item.listingType == 2 &&
            <p> <strong>Current Bid:</strong> </p>
          }

          { item.listingType == 2 &&
            <EndDateCountdown props={props} />
          }

          { <Seller props={props} /> }
          { <ImgCollection props={props} /> }

          <Link to={`/items/${item._id}`}>
            <button className="btn btn-primary mr2"> View </button>
          </Link>

          { item.listingType == 1 &&
            <button
              className="btn btn-primary"
              onClick={(event) => this.props.goToPurchaseItem(event, item._id)}
            >
              Purchase
            </button>
          }

          { item.listingType == 2 &&
            !this.state.openBidOptions &&

            <button
              className="btn btn-primary"
              onClick={(event) => this.toggleBidOptions(event, item._id)}
            >
              Make a Bid
            </button>
          }

          { item.listingType == 2 &&
            this.state.openBidOptions &&

            <button
              className="btn btn-danger"
              onClick={(event) => this.toggleBidOptions(event, item._id)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          }

          { this.state.openBidOptions &&
            <placeBid props={props} />
          }
        </div>
      </div>
    )
  }
}

export default Item;
