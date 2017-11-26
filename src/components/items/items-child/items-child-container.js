import React from 'react'
import ItemsChildJsx from './items-child.jsx'
import {http} from '../../../http-requests'
import countdown from 'countdown'

class ItemsChild extends React.Component {
  constructor() {
    super()

    this.state = {
      countdown: '',
      openBidOptions: false,
      openCustomBidOption: false,
      bidAmount: 0,
      bidFeedback: ''
    }
  } 

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  /****
    handlers
  *****/

  handleBidAmount = (event) => {
    this.setState({bidAmount: event.target.value})
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

  /**
   *
   */
  goToPurchaseItem = () => {
    console.log('go to purchase item ??????')
  }

  /**
   *  Create new bid model (place a bid on item)
   */
  createBid = () => {
    if (!this.bidValidation()) { return }

    http.post(`bids`, {
      amount: this.state.bidAmount,
      item: this.props.item._id
    })
      .then(() => {
        this.setState({bidFeedback: 'Your bid was placed'})
        this.setState({openBidOptions: false})
      })
      .catch((err) => {
        if (err.response.status === 403) {
          this.setState({bidFeedback: err.response.data})
          return
        }

        throw new Error()
      })
  }

  /**
   * validate bid amount is greater than latest bid if exists else starting price
   */
  bidValidation = () => {
    this.setState({bidFeedback: ''})
    const item = this.props.item

    const currentBid = item.bids.length > 0 ? item.bids[0].amount :
      item.bidStats.startingPrice

    if (this.state.bidAmount <= currentBid) {
      this.setState({
        bidFeedback: 'Bid must be greater than latest bid'
      })

      return false
    }

    return true
  }

  render() {
    return (
      <ItemsChildJsx
        item={this.props.item}

        openBidOptions={this.state.openBidOptions}
        openCustomBidOption={this.state.openCustomBidOption}
        countdown={this.state.countdown}
        bidFeedback={this.state.bidFeedback}

        handleBidAmount={this.handleBidAmount}
        toggleBidOptions={this.toggleBidOptions}
        toggleOpenCustomBid={this.toggleOpenCustomBid}
        goToPurchaseItem={this.goToPurchaseItem}
        createBid={this.createBid}
      />
    )
  }
}

export default ItemsChild
