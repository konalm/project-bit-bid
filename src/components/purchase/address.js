import React from 'react';

import {http} from '../../http-requests';


class PurchaseAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousAddress: {},
      newAddress: {},
      checkedAddress: false,
      selectNewAddress: false
    }

    this.getPreviousAddress();
  }

  /***
    state handlers
  ***/
  handleAddressLineChange = (event) => {
    let newAddress = this.state.newAddress;
    newAddress.addressLine = event.target.value;

    this.setState({
      newAddress: newAddress
    });
  }

  handleAddressLine2Change = (event) => {
    let newAddress = this.state.newAddress;
    newAddress.addressLine2 = event.target.value;

    this.setState({
      newAddress: newAddress
    });
  }

  handleCountryChange = (event) => {
    let newAddress = this.state.newAddress;
    newAddress.country = event.target.value;

    this.setState({
      newAddress:  newAddress
    });
  }

  handleCityChange = (event) => {
    let newAddress = this.state.newAddress;
    newAddress.city = event.target.value;

    this.setState({
      newAddress: newAddress
    });
  }

  handlePostcodeChange = (event) => {
    let newAddress = this.state.newAddress;
    newAddress.postcode = event.target.value;

    this.setState({
      newAddress: newAddress
    });
  }

  getPreviousAddress = () => {
    http.get('user-address')
      .then(res => {
        if (res.data.addressLine) {
          this.setState({
            previousAddress: res.data,
          });
        }

        this.setState({checkedAddress: true});
      })
      .catch(() => {
        throw new Error('Issue getting user address from the API');
        this.setState({checkedAddress: true});
      })
  }

  /**
   * set state of new Address to true,
   * triggers display of new address
   */
  selectNewAddress = (e) => {
    e.preventDefault();

    this.setState({
      selectNewAddress: !this.state.selectNewAddress
    })
  }

  render() {
    const address = this.state.previousAddress;

    const previousAddressContainer =
      this.state.checkedAddress && Object.keys(address).length !== 0 ?
        <div className="panel panel-primary previousAddressContainer">
          <div className="panel-body">
            <p>{address.country}</p>
            <p>{address.city}</p>
            <p>{address.postcode}</p>
            <p>{address.addressLine}</p>
            <p>{address.addressLine2}</p>
          </div>
        </div>
        :
        <div> </div>;

    const newAddressContainer = this.state.selectNewAddress ?
      <div className="panel panel-primary">
        <div className="panel-body">
          {/* country */}
          <div className="form-group">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                onChange={this.handleCountryChange}
                value={this.state.newAddress.country}
                required
              />
              <br />
            </div>
          </div>

          {/* city */}
          <div className="form-group">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                onChange={this.handleCityChange}
                value={this.state.newAddress.city}
                required
              />
              <br />
            </div>
          </div>

          {/* postcode */}
          <div className="form-group">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Postcode"
                onChange={this.handlePostcodeChange}
                value={this.state.newAddress.postcode}
                required
              />
              <br />
            </div>
          </div>

          {/* address line */}
          <div className="form-group">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Address Line"
                onChange={this.handleAddressLineChange}
                value={this.state.newAddress.addressLine}
                required
              />
              <br />
            </div>
          </div>

          {/* address line 2 */}
          <div className="form-group">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 2"
                onChange={this.handleAddressLine2Change}
                value={this.state.newAddress.addressLine2}
                required
              />
              <br />
            </div>
          </div>
        </div>
      </div>
      :
      <div></div>;


    return (
      <div>
        <h4>Delivery Address</h4>
        <div className="row">
          {previousAddressContainer}

          <button
            className="btn btn-primary"
            onClick={(e) => this.selectNewAddress(e)}
          >
            {!this.state.selectNewAddress &&
              <span>New Address</span>
            }

            {this.state.selectNewAddress &&
              <span>Use Previous Address</span>
            }
          </button>
        </div>
        <br />

        <div className="row">
          {newAddressContainer}
        </div>
      </div>
    )
  }
}

export default PurchaseAddress;
