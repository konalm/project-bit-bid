import React from 'react';
import Header from '../reuse/header'
import axios from 'axios'
import {http} from '../../http-requests'
import cookies from 'js-cookie'
import $ from 'jquery';

import NoBankAccountModal from './no-bank-account-modal'

var FormData = require('form-data');
var fs = require('fs');

window.jQuery = window.$ = $;
require('bootstrap');

class ListItem extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      category: '',
      condition: '',
      description: '',
      sellMethod: '',
      deliveryMethod: '',
      price: '',
      previewSrc: '',
      uploadedImages: [],
      userHasBankAccount: false,
      checkedForBankAccount: false
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSellMethodChange = this.handleSellMethodChange.bind(this);
    this.handleDeliveryMethodChange = this.handleDeliveryMethodChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.submitListItem = this.submitListItem.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.removeImgUpload = this.removeImgUpload.bind(this);

    this.checkUserHasBankAccount();

    $('#noBankAccountModal').on('hidden.bs.modal', function () {
      console.log('modal closed !!');
    });

    $('#noBankAccountModal').on('hidden', function () {
      console.log('modal closed xx !!');
    })
  }

  componentDidMount() {
    console.log('component did mount');

    $('#noBankAccountModal').on('hidden.bs.modal', function () {
      console.log('modal closed !!');
    });

    $('#noBankAccountModal').on('hidden', function () {
      console.log('modal closed xx !!');
    })
  }

  /**********
    handlers
  ********/
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  handleConditionChange(event) {
    this.setState({condition: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleSellMethodChange(event) {
    this.setState({sellMethod: event.target.value});
  }

  handleDeliveryMethodChange(event) {
    this.setState({deliveryMethod: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }


  /**
   * push file uploaded into array and read src
   */
  handleFileUpload(event) {
    const files = event.target.files;

    Object.keys(files).forEach((index) => {
      let reader = new FileReader();

      let newImgUpload = {};
      newImgUpload.file = files[index];

      reader.readAsDataURL(newImgUpload.file);

      reader.onload = (event) => {
        newImgUpload.readSrc = event.target.result;

        let uploadedImages = this.state.uploadedImages;
        uploadedImages.push(newImgUpload);

        this.setState({uploadedImages: uploadedImages});
      }
    });
  }

  /*
   * post item values to the API
   */
  submitListItem (e) {
    e.preventDefault();
    let imgData = new FormData();

    this.state.uploadedImages.forEach((img, index) => {
      imgData.append("fileToUpload[]", img.file);
    });

    let itemData = {
      title: this.state.title,
      category: this.state.category,
      condition: this.state.condition,
      description: this.state.description,
      sellMethod: this.state.sellMethod,
      deliveryMethod: this.state.deliveryMethod,
      price: this.state.price,
    };

    http.post('items', itemData, {
      headers: { 'Authorization': cookies.get('bit_bid_key') }
    })
      .then(res => {
        let itemId = res.data.data._id;

        return http.post(`items/${itemId}`, imgData, {
          headers: { 'Authorization': cookies.get('bit_bid_key') }
        })
      })
      .catch(err => { throw new Error(err); })
  }

  /**
   * remove image data being stored in array
   */
  removeImgUpload (e, index) {
    e.preventDefault();

    let newImgUploads = this.state.uploadedImages;
    newImgUploads.splice(index, 1);

    this.setState({
      uploadedImages: newImgUploads
    });
  }

  /**
   * check user has bank account
   */
  checkUserHasBankAccount = () => {
    console.log('check user has bank account !!');

    http.get('bank-accounts').then(res => {
      console.log('bank accounts length ->');
      console.log(res);
      console.log(res.data.data.length);

      if (res.data.data.length === 0) {
        console.log('show !!!!');
        $('#noBankAccountModal').modal('show');
      }

      this.setState({
        userHasBankAccount: res.data.data.length > 0 ? true : false,
        checkUserHasBankAccount: true
      })
    })
    .catch(err => { throw new Error(err); })
  }

  render() {
    const previewImages = this.state.uploadedImages.map((previewImage, index) => {
      return (
        <div className="col-lg-3 well well-lg ml-1">
          <img id="preview" src={previewImage.readSrc} alt="preview image" width="200px" />
          <br /> <br />
          <button
            className="btn btn-primary"
            onClick={(e) => this.removeImgUpload(e, index)}
          >
            Remove
          </button>
        </div>
      )
    });

    let userHasBankAccount = this.state.userHasBankAccount;

    return (
        <div>
          <Header />
          {userHasBankAccount &&
          <div className="container">
            <h1>List Item</h1>
            <br /> <br />

            <form className="form-horizontal" >
              <fieldset>
                {/* title */}
                <div className="form-group">
                  <label htmlFor="descritiveTitle" className="col-lg-2 control-label">
                    Descriptive Title
                  </label>

                  <div className="col-lg-10">
                    <input
                      type="text"
                      name="descriptive-title"
                      placeholder="descriptive title"
                      className="form-control"
                      onChange={this.handleTitleChange}
                    />
                  </div>
                </div>

                {/* image upload */}
                <div className="form-group">
                  <input
                    name="filesToUpload[]"
                    id="fileToUpload"
                    type="file"
                    className="form-control"
                    multiple
                    onChange={this.handleFileUpload}
                  />
                </div>

                <br /> <br />

                <div className="row">
                  {previewImages}
                </div>

                {/* category */}
                <div className="form-group">
                  <label htmlFor="select" className="col-lg-2 control-label">
                    Select Category
                  </label>

                  <div className="col-lg-10">
                    <select
                      className="form-control"
                      id="select"
                      onChange={this.handleCategoryChange}
                    >
                      <option defaultValue="">Select Category</option>
                      <option value="sports">Sports</option>
                      <option value="beauty">Beauty</option>
                      <option value="fashion">Fashion</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothes">Clothes</option>
                      <option value="baby">Baby</option>
                      <option value="beauty">Beauty</option>
                      <option value="books">Books</option>
                      <option value="car-motorbike">Cars And Motorbike</option>
                    </select>
                  </div>
                </div>

                {/* condition */}
                <div className="form-group">
                  <label htmlFor="select-condition" className="col-lg-2 control-label">
                    Select Condition
                  </label>

                  <div className="col-lg-10">
                    <select
                      className="form-control"
                      id="selectCondition"
                      onChange={this.handleConditionChange}
                    >
                      <option defaultValue="">Select Condition</option>
                        <option value="damaged">Damaged</option>
                        <option value="used">Used</option>
                        <option value="refurbished">Refurbished</option>
                        <option value="new-unopened">New and Unopened</option>
                        <option value="new-almost">Almost New</option>
                      </select>
                    </div>
                  </div>

                {/* item description */}
                <div className="form-group">
                  <label htmlFor="textArea" className="col-lg-2 control-label">
                    Item Description
                  </label>

                  <div className="col-lg-10">
                    <textarea
                      rows="8"
                      cols="50"
                      placeholder="describe your item in as much details as possible"
                      className="form-control"
                      id="textArea"
                      onChange={this.handleDescriptionChange}
                    >
                    </textarea>
                  </div>
                </div>

                {/* sell type (auction / buy now)  */}
                <div className="form-group">
                  <label className="col-lg-2 control-label">Sell Type</label>
                  <div className="col-lg-10">
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="sell-type"
                          value="1"
                          onChange={this.handleSellMethodChange}
                        />
                        Auction
                      </label>
                    </div>

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="sell-type"
                          value="2"
                          onChange={this.handleSellMethodChange}
                        />
                        Buy Now
                      </label>
                    </div>
                  </div>
                </div>

                {/* delivery method (royal mail / free) */}
                <div className="form-group">
                  <label className="col-lg-2 control-label">Delivery Type</label>
                  <div className="col-lg-10">
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="delivery-choice"
                          value="1"
                          onChange={this.handleDeliveryMethodChange}
                        />
                        Royal Mail
                      </label>
                    </div>

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="delivery-choice"
                          value="2"
                          onChange={this.handleDeliveryMethodChange}
                        />
                        Free
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="col-lg-2 control-label">
                    Price
                  </label>

                  <div className="col-lg-10">
                    <input
                      type="number"
                      name="price"
                      placeholder="price"
                      className="form-control"
                      onChange={this.handlePriceChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button type="submit" className="btn btn-primary" onClick={this.submitListItem}>
                      List Item
                    </button>
                  </div>
                </div>
            </fieldset>
          </form>
        </div>
       }

       <NoBankAccountModal />
    </div>
    )
  }
};

export default ListItem;
