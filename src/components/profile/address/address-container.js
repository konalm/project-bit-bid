import React from 'react'
import axios from 'axios'

import requireAuth from '../../../requireAuth'
import {http} from '../../../http-requests'
import {getApiUrl} from '../../../globals'
import {getApiToken} from '../../../globals'

import AddressJsx from './address.jsx'

var countries = require('country-list')();

class ProfileAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: '',
      password: '',
      postcode: '',
      errorMessage: '',
      successMessage: '',
    }

    this.checkUserIsLoggedIn();
    this.getUserAddress();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
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
    if (!this.state.loggedIn) { return null; }
    
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
