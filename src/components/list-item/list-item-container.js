import React from 'react';
import { withRouter } from 'react-router-dom'
import cookies from 'js-cookie'
import $ from 'jquery';

import requireAuth from '../../requireAuth'
import {http} from '../../http-requests'

import ListItemJsx from './list-item.jsx'

window.jQuery = window.$ = $;
require('bootstrap');

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      title: '',
      category: '',
      condition: '',
      description: '',
      sellMethod: 1,
      deliveryMethod: 1,
      price: '',
      previewSrc: '',
      uploadedImages: [],
      userHasBankAccount: false,
      checkedForBankAccount: false,
      feedbackMessage: '',
      itemListed: false,
      listedItemId: ''
    }

    this.checkUserIsLoggedIn();
    this.checkUserHasBankAccount();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
  }


  /**********
    handlers
  ********/
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleCategoryChange = (event) => {
    this.setState({category: event.target.value});
  }

  handleConditionChange = (event) => {
    this.setState({condition: event.target.value});
  }

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  handleSellMethodChange = (event) => {
    this.setState({sellMethod: event.target.value});
  }

  handleDeliveryMethodChange = (event) => {
    this.setState({deliveryMethod: event.target.value});
  }

  handlePriceChange = (event) => {
    this.setState({price: event.target.value});
  }

  /**
   * validate inputted item data
   */
  validateItemData = (event) => {
    this.setState({feedbackMessage: ''});

    if (!this.state.uploadedImages.length > 0) {
      this.setState({feedbackMessage: 'at least one image is required.'})
      return false;
    }

    if (this.state.description.length < 20) {
      this.setState({
        feedbackMessage: 'at least 20 characters required for description'
      });

      return false;
    }

    return true;
  }

  /**
   * push file uploaded into array and read src
   */
  handleFileUpload = (event) => {
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
  submitListItem = (event) => {
    event.preventDefault();

    if (!this.validateItemData()) { return; }

    let imgData = new FormData();

    this.state.uploadedImages.forEach((img, index) => {
      imgData.append("fileToUpload[]", img.file);
    });

    let itemData = this.prepareItemData();

    http.post('items', itemData, {
      headers: { 'Authorization': cookies.get('bit_bid_key') }
    })
      .then(res => {
        let itemId = res.data.data._id;
        this.setState({
          listedItemId: res.data.data._id,
          itemListed: true
        });

        return http.post(`items/${itemId}`, imgData, {
          headers: { 'Authorization': cookies.get('bit_bid_key') }
        })
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.setState({feedbackMessage: err.response.data});
          return;
        }

        throw new Error(err);
      })
  }

  /**
   * prepare item data object
   */
  prepareItemData = () => {
    return {
      title: this.state.title,
      category: this.state.category,
      condition: this.state.condition,
      description: this.state.description,
      sellMethod: this.state.sellMethod,
      deliveryMethod: this.state.deliveryMethod,
      price: this.state.price,
      uploadedImagesLength: this.state.uploadedImages.length
    }
  }

  /**
   * remove image data being stored in array
   */
  removeImgUpload = (e, index) => {
    e.preventDefault();

    let newImgUploads = this.state.uploadedImages;
    newImgUploads.splice(index, 1);

    this.setState({ uploadedImages: newImgUploads });
  }

  /**
   * check user has bank account
   */
  checkUserHasBankAccount = () => {
    http.get('bank-accounts').then(res => {
      if (res.data.data.length === 0) {
        $('#noBankAccountModal').modal('show');
      }

      this.setState({
        userHasBankAccount: res.data.data.length > 0 ? true : false,
        checkUserHasBankAccount: true
      })
    })
    .catch(err => { throw new Error(err); })
  }

  render () {
    if (!this.state.loggedIn) { return null; }

    return (
      <ListItemJsx
        handleTitleChange={this.handleTitleChange}
        handleFileUpload={this.handleFileUpload}
        handleCategoryChange={this.handleCategoryChange}
        handleConditionChange={this.handleConditionChange}
        handleDescriptionChange={this.handleDescriptionChange}
        handleSellMethodChange={this.handleSellMethodChange}
        handleDeliveryMethodChange={this.handleDeliveryMethodChange}
        handlePriceChange={this.handlePriceChange}
        submitListItem={this.submitListItem}
        userHasBankAccount={this.state.userHasBankAccount}
        uploadedImages={this.state.uploadedImages}
        feedbackMessage={this.state.feedbackMessage}
        itemListed={this.state.itemListed}
        listedItemId={this.state.listedItemId}
      />
    )
  }
}

export default withRouter(ListItem);
