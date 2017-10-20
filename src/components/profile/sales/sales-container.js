import React from 'react'
import { withRouter } from 'react-router-dom'

import requireAuth from '../../../requireAuth'
import {http} from '../../../http-requests'

import View from './sales.jsx'

class Sales extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      sales: {}
    }

    this.checkUserIsLoggedIn();
    this.getSales();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
  }

  /**
   * get all user Sales
   */
  getSales = () => {
    http.get('sales').then(res => {
      this.setState({sales: res.data});
    })
  }

  render() {
    if (!this.state.loggedIn) { return null; }
    
    return <View sales={this.state.sales} />
  }
}

export default withRouter(Sales);
