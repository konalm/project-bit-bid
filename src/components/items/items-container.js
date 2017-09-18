import React from 'react';
import axios from 'axios';
import {http} from '../../http-requests';

import View from './items-view';


class ListedItems extends React.Component {
  constructor() {
    super();

    this.state = {
      items: {},
      searchQuery: 'default',
      category: 'default',
      imgCollection: []
    }

    this.updateListItems();
  }

  /**
   * update list items
   */
  updateListItems = () => {
    http.get(`items/category/${this.state.category}/search/${this.state.searchQuery}`)
      .then(res => {
        this.setState({items: res.data});
      })
      .catch(err => { throw new Error(err); })
  }

  /**
   * selected category from child
   */
  selectCategoryCallback = (category) => {
    this.setState({'category': category.key});
  }

  /* watch category for change */
  componentWillUpdate(nextProps) {
    if (this.state.searchQuery !== nextProps.searchQuery &&
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
      <View items={this.state.items}
        passCategoryToParent={this.selectCategoryCallback}
      />
  )}
}

export default ListedItems;
