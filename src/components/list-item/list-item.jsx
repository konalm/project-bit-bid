import React from 'react'
import {Link} from 'react-router-dom'

import Header from '../reuse/header'
import NoBankAccountModal from './no-bank-account-modal'


/**
 * preview images jsx
 */
const PreviewImages = ({props}) => {
  if (!props.uploadedImages.length > 0) { return null; }

  return (
    <div>
      { props.uploadedImages.map((previewImage, index) => {
          return (
            <div className="col-lg-3 well well-lg ml-1">
              <img
                id="preview"
                src={previewImage.readSrc}
                alt="preview image"
                width="200px"
              />

              <br /> <br />

              <button
                className="btn btn-primary"
                onClick={(e) => this.removeImgUpload(e, index)}
              >
                Remove
              </button>
            </div>
          );
        })
      }
    </div>
  )
}

/**
 * Item listed feedback Jsx
 */
const ItemListedFeedback = ({props}) => {
  if (!props.itemListed) { return null; }

  return (
    <div>
      <p className="lead">Successfully Listed Item.</p>
      <Link to={`/items/${props.listedItemId}`}>
        <button className="btn btn-primary">
          View Item
        </button>
      </Link>
    </div>
  )
}

/**
 * list item for marketplace Sale
 */
const ListItemForSale = ({props}) => {
  return (
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
          onChange={props.handlePriceChange}
          required
        />
      </div>
    </div>
)}

/**
 * list item for bid
 */
const ListItemForBid = ({props}) => {
  return (
    <div>
      {/* bid starting price */}
      <div className="form-group">
        <label htmlFor="bidStartingPrice" className="col-lg-2 control-label">
          Bid Starting Price
        </label>

        <div className="col-lg-10">
          <input
            type="text"
            name="bid-starting-price"
            placeholder="Bid starting price"
            className="form-control"
            onChange={props.handleBidStartingPrice}
            value={props.bidStartingPrice}
            required
          />
        </div>
      </div>

      {/* bid duration */}
      <div className="form-group">
        <label htmlFor="bidDuration" className="col-lg-2 control-label">
          Bid Duration
        </label>

        <div className="col-lg-10">
          <select
            className="form-control"
            id="bidDuration"
            onChange={props.handleBidDurationChange}
            required
          >
            <option value="">Select Duration</option>
            <option value="7">1 Week</option>
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="14">2 Weeks</option>
            <option value="28">4 Weeks</option>
          </select>
        </div>
      </div>
    </div>
)}

/**
 * descriptive title input
 */
const DescriptiveTitle = ({props}) => {
  return (
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
          onChange={props.handleTitleChange}
          required
        />
      </div>
    </div>
)}

/**
 * image upload input
 */
const ImageUploadInput = ({props}) => {
  return (
    <div className="form-group">
      <input
        name="filesToUpload[]"
        id="fileToUpload"
        type="file"
        className="form-control"
        multiple
        onChange={props.handleFileUpload}
      />
    </div>
)}

/**
 * select category
 */
const SelectCategory = ({props}) => {
  return (
    <div className="form-group">
      <label htmlFor="select" className="col-lg-2 control-label">
        Select Category
      </label>

      <div className="col-lg-10">
        <select
          className="form-control"
          id="select"
          onChange={props.handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
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
)}

/**
 * select condition option
 */
const SelectCondition =({props}) => {
  return (
    <div className="form-group">
      <label htmlFor="select-condition" className="col-lg-2 control-label">
        Select Condition
      </label>

      <div className="col-lg-10">
        <select
          className="form-control"
          id="selectCondition"
          onChange={props.handleConditionChange}
          required
        >
          <option value="">Select Condition</option>
          <option value="damaged">Damaged</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
          <option value="new-unopened">New and Unopened</option>
          <option value="new-almost">Almost New</option>
        </select>
      </div>
    </div>
)}

/**
 * Item Description Input
 */
const ItemDescription = ({props}) => {
  return (
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
          onChange={props.handleDescriptionChange}
          required
        >
        </textarea>
      </div>
    </div>
)}

/**
 * Select type of select method option
 */
const SelectSaleMethod = ({props}) => {
  return (
    <div className="form-group">
      <label className="col-lg-2 control-label">Sell Type</label>
      <div className="col-lg-10">
        <div className="radio">
          <label>
            <input
              type="radio"
              name="sell-type"
              value="2"
              checked={props.sellMethod == 2}
              onChange={props.handleSellMethodChange}
            />

            Auction
          </label>
        </div>

        <div className="radio">
          <label>
            <input
              type="radio"
              name="sell-type"
              value="1"
              checked={props.sellMethod == 1}
              onChange={props.handleSellMethodChange}
            />

            Buy Now
          </label>
        </div>
      </div>
    </div>
)}

/**
 * select delivery method option
 */
const SelectDeliveryMethod = ({props}) => {
  return (
    <div className="form-group">
      <label className="col-lg-2 control-label">Delivery Type</label>

      <div className="col-lg-10">
        <div className="radio">
          <label>
            <input
              type="radio"
              name="delivery-choice"
              value="1"
              onChange={props.handleDeliveryMethodChange}
              checked="checked"
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
              onChange={props.handleDeliveryMethodChange}
            />
            Free
          </label>
        </div>
      </div>
    </div>
  )
}

/**
 * list item form jsx
 */
const ListItemForm = ({props}) => {
  if (!props.userHasBankAccount || props.itemListed) {
    return null;
  }

  return (
    <form
      className="form-horizontal"
      onSubmit={(event) => props.submitListItem(event)}
    >
      <fieldset>
        <DescriptiveTitle props={props} />
        <ImageUploadInput props={props} />

        <br /> <br />

        <div className="row">
          <PreviewImages props={props}/>
        </div>

        <SelectCategory props={props} />
        <SelectCondition props={props} />
        <ItemDescription props={props} />
        <SelectSaleMethod props={props} />

        { props.sellMethod == 1 &&
          <ListItemForSale props={props} />
        }

        { props.sellMethod == 2 &&
          <ListItemForBid props={props} />
        }

        <SelectDeliveryMethod props={props} />

        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              List Item
            </button>
          </div>
        </div>

        {/* feedback message */}
        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            {props.feedbackMessage}
          </div>
        </div>
      </fieldset>
    </form>
)}

/**
 * List Item JSX
 */
const ListItem = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>List Item</h1>
        <br /> <br />

        <ListItemForm props={props} />
        <ItemListedFeedback props={props} />
      </div>

      <NoBankAccountModal />
    </div>
  )
}

export default ListItem;
