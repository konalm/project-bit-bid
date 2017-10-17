import React from 'react'
import axios from 'axios'

import {http} from '../../../http-requests'
import {getApiUrl} from '../../../globals'
import {getApiToken} from '../../../globals'

import AddressJsx from './address.jsx'

var countries = require('country-list')();

class ProfileAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: '',
      password: '',
      postcode: '',
      errorMessage: '',
      successMessage: '',
    }

    this.getUserAddress();
  }

  /****
    handlers
  ****/
  handleAddressLineChange = (event) => {
    this.setState({addressLine1: event.target.value});
  }

  handleAddressLine2Change = (event) => {
    this.setState({addressLine2: event.target.value});
  }

  handleCountryChange = (event) => {
    console.log('handle country change');
    const countryCode = countries.getCode(event.target.value);
    this.setState({country: countryCode});
  }

  handleCityChange = (event) => {
    this.setState({city: event.target.value});
  }

  handlePostCodeChange = (event) => {
    this.setState({postcode: event.target.value});
  }

  /**
   * get user address
   */
  getUserAddress = () => {
    http.get('user-address')
      .then(response => {
        this.setState({
          addressLine1: response.data.addressLine,
          addressLine2: response.data.addressLine2,
          city: response.data.city,
          country: response.data.country,
          postcode: response.data.postcode
        });
      })
      .catch(err => { throw new Error(err) })
  }

  /**
   * post address details to the API
   */
  submitAddress = (event) => {
    console.log('submit address !!');
    console.log(this.state.country);

    // return;

    event.preventDefault();
    this.setState({errorMessage: '', successMessage: ''});



    http.put(`user-address`, {
      addressLine: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      country: this.state.country,
      city: this.state.city,
      postcode: this.state.postcode
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({successMessage: 'Your changes where updated'});
          this.getUserAddress();
        }
      })
      .catch(error => {
        /* failed backend validation */
        if (error.response.status === 403) {
          this.setState({errorMessage: error.response.data});
        }
      })
  }

  render () {
    return (
      <AddressJsx
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        addressLine1={this.state.addressLine1}
        addressLine2={this.state.addressLine2}
        country={this.state.country}
        city={this.state.city}
        postcode={this.state.postcode}
        submitAddress={this.submitAddress}
        handleAddressLineChange={this.handleAddressLineChange}
        handleAddressLine2={this.handleAddressLine2Change}
        handleCountryChange={this.handleCountryChange}
        handleCityChange={this.handleCityChange}
        handlePostCodeChange={this.handlePostCodeChange}
      />
    )
  }
}

export default ProfileAddress;
