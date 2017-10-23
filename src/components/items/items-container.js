import React from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux'
import store from '../../store'

import {http} from '../../http-requests';
import requireAuth from '../../requireAuth'

import View from './items-view';

window.jQuery = window.$ = $;
require('bootstrap');


class ListedItems extends React.Component {
  constructor() {
    super();

    this.state = {
      items: {},
      searchQuery: 'default',
      category: 'default',
      imgCollection: [],
      loginMessage: ''
    }

    this.updateListItems();
  }

  /**
   * update list items
   */
  updateListItems = () => {
    http.get(`items/category/${this.state.category}/search/${this.state.searchQuery}`)
      .then(res => { this.setState({items: res.data}); })
      .catch(err => { throw new Error(err); })
  }

  /**
   * go to purchase item view
   */
  goToPurchaseItem = (event, itemId) => {
    this.setState({loginMessage: 'Must be logged in to make purchases'});

    requireAuth()
      .then(() => { this.props.history.push(`/purchase/${itemId}`); })
      .catch(() => { $('#loginModal').modal('show'); })
  }

  /**
   * selected category from child
   */
  selectCategoryCallback = (category) => {
    this.setState({'category': category.key});
  }

  /* watch category for change */
  componentWillUpdate(nextProps) {
    if (
      this.state.searchQuery !== nextProps.searchQuery &&
      nextProps.searchQuery !== undefined
    ) {
      this.setState({'searchQuery': nextProps.searchQuery});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.updateListItems();
    }

    /* search query changed -> update list items */
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.updateListItems();
    }
  }

  render() {
    return (
      <View
        items={this.state.items}
        passCategoryToParent={this.selectCategoryCallback}
        goToPurchaseItem={this.goToPurchaseItem}
        loginMessage={this.state.loginMessage}
      />
  )}
}

/**
 * map state search query to prop
 */
const mapStateToProps = (state) => ({
  searchQuery: store.getState()[0].currentSearchQuery
})

ListedItems = connect(mapStateToProps)(ListedItems);

export default withRouter(ListedItems);
