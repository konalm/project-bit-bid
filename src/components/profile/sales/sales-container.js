import React from 'react'
import {http} from '../../../http-requests'

import View from './sales.jsx'

class Sales extends React.Component {
  constructor() {
    super();

    this.state = {
      sales: {}
    }

    this.getSales();
  }

  /**
   * get all user Sales
   */
  getSales = () => {
    console.log('get sales !!');

    http.get('sales').then(res => {
      this.setState({sales: res.data});
    })
  }

  render() { return <View sales={this.state.sales} /> }
}

export default Sales;
