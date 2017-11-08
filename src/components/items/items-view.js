import React from 'react'
import PropTypes from 'prop-types'

import Header from '../reuse/header';
import SidebarComponent from '../reuse/sidebar'

import Item from './items-child.jsx'
import Pagination from './pagination'
import LoginModal from '../reuse/login-modal'


class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  /***
    callback
  ***/
  selectCategoryCallback = (category) => {
    this.props.passCategoryToParent(category);
  }

  render() {
    const allItems = Object.keys(this.props.items).map((key, index) => {
      return (
        <Item
          item={this.props.items[key]}
          goToPurchaseItem={this.props.goToPurchaseItem}
        />
      )
    });

    return (
      <div>
        <Header />

        <div className="container">
          <div className="row">
            <h1>Items Listed</h1>
            <hr />
          </div>

          <div className="row">
            <SidebarComponent
              parentSelectCategory={this.selectCategoryCallback}
            />

            <div className="col-lg-8">
              { allItems }

              <Pagination
                count={this.props.itemCount}
                handlePageNoChange={this.props.handlePageNoChange}
              /> 
            </div>
          </div>
        </div>

        <LoginModal message={this.props.loginMessage} />
      </div>
  )};
}


export default Items;
