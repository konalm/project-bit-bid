import React from 'react'
import PropTypes from 'prop-types'

import Header from '../reuse/header';
import SidebarComponent from '../reuse/sidebar'

import Item from './items-child.jsx'


class Items  extends React.Component {
  constructor(props) {
    super(props);
  }

  /***
    callback
  ***/
  selectCategoryCallback = (category) => {
    console.log('select category callback !!');
    console.log(category);
    this.props.passCategoryToParent(category);
  }

  render() {
    const allItems = Object.keys(this.props.items).map((key, index) => {
      return <Item item={this.props.items[key]} />
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
            <SidebarComponent parentSelectCategory={this.selectCategoryCallback} />

            <div className="col-lg-8">
              { allItems }
            </div>
          </div>
        </div>
      </div>
  )};
}


export default Items;
