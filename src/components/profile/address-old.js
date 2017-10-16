import React from 'react'

import axios from 'axios'

import {http} from '../../http-requests'
import {getApiUrl} from '../../globals'
import {getApiToken} from '../../globals'

import Header from '../reuse/header'
import ProfileSidebar from './profile-sidebar'

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
    this.setState({country: event.target.value});
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
      .catch(err => {throw new Error(err)})
  }

  /**
   * post address details to the API
   */
  submitAddress = (e) => {
    e.preventDefault();
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
        if (error.response.status === 422) {
          this.setState({errorMessage: error.response.data});
        }
      })
  }

  render () {
    return (
      <div>
        <Header />

        <div className="container">
          <div className="row">
            <h2>Profile</h2>
            <hr />
          </div>

          <div className="row">
            <ProfileSidebar />

            <div className="col-lg-8">
              <form onSubmit={this.submitAddress}>
                <h3> Address </h3>
                <br />
                <div className="row">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address line"
                    className="form-control"
                    value={this.state.addressLine1}
                    onChange={this.handleAddressLineChange}
                    required
                  />
                </div>

                <br />

                <div className="row">
                  <input
                    type="text"
                    name="address-line-2"
                    placeholder="Address line 2"
                    className="form-control"
                    value={this.state.addressLine2}
                    onChange={this.handleAddressLine2Change}
                  />
                </div>

                <br />

                <div className="row">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="form-control"
                    value={this.state.country}
                    onChange={this.handleCountryChange}
                    required
                  />
                </div>

                <br />

                <div className="row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="form-control"
                    value={this.state.city}
                    onChange={this.handleCityChange}
                    required
                  />
                </div>

                <br />

                <div className="row">
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    className="form-control"
                    value={this.state.postcode}
                    onChange={this.handlePostCodeChange}
                    required
                  />
                </div>

                <br />

                {/* error message */}
                {this.state.errorMessage &&
                  <div className="row">
                    {this.state.errorMessage}
                    <br /> <br />
                  </div>
                }

                {/* success message */}
                {this.state.successMessage &&
                  <div className="row">
                    {this.state.successMessage}
                    <br /> <br />
                  </div>
                }

                <div className="row">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div> {/* row end */}
        </div> {/* container end */}
      </div>
    )
  }
}

export default ProfileAddress;
