import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'

import store from '../store'

import Header from './reuse/header';
import SidebarComponent from './reuse/sidebar';


class ItemsListed extends React.Component {
  constructor() {
    super();

    this.state = {
      items: {},
      searchQuery: 'default',
      category: 'default',
      imgCollection: []
    }

    this.getItems = this.getItems.bind(this);
    this.getItems();

    this.parentSelectCategory = this.parentSelectCategory.bind(this);
    this.updateListItems = this.updateListItems.bind(this);
    this.items = this.items.bind(this);

    this.updateListItems();
  }

  getItems () {
    axios.get('http://localhost:8080/api/items')
      .then(res => {
        this.setState({items: res.data});
      })
  }

  parentSelectCategory(category) {
    this.setState({'category': category.key});
  }

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

  /**
   * send query to api and assign list items to response
   */
  updateListItems() {
    axios.get(`http://localhost:8080/api/items/category/${this.state.category}/search/${this.state.searchQuery}`)
      .then(res => {
        this.setState({items: res.data});
      });
  }

  items () {
    const items = Object.keys(this.state.items).map(function(key, index) {
      const item = this.state.items[key];

      const imgCollection = item.imgCollection.map(img => {
        return (
          <div className="col-lg-3">
            <img
              src={`http://localhost:8080/api/render-item-img/${item.user._id}/item/${item._id}/img-path/${img}`}
              width="200px"
            />
          </div>
        )
      });

      item.delivery = item.deliveryMethod === 1 ? 'royal mail' : 'free';
      const sellerUsername = item.user ? item.user.username : '';

      return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            {item.title}
          </div>

          <div className="panel-body">
            {item.category}
            <br />
            {item.description}
            <br />
            {item.delivery}
            <br />
            <strong>Condition:</strong> {item.condition}
            <br />
            <strong>Price:</strong> {item.price}
            <br />

            <strong>
              Seller:
              <Link to={`/view-profile/${sellerUsername}`}>
                {sellerUsername}
              </Link>
            </strong>

            <div className="row mt2">
              {imgCollection}
            </div>

            <Link to={'/items/' + item._id} className="mr2 mt2">
              <button className="btn btn-primary">
                View
              </button>
            </Link>

            <Link to={`/purchase/${item._id}`}>
              <button className="btn btn-primary">
                Purchase
              </button>
            </Link>
          </div>
        </div>
      )
    }, this);

    return items;
  }

  render () {
    const items = this.items();

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <h1>Items Listed</h1>
            <hr />
          </div>

          <div className="row">
            <SidebarComponent parentSelectCategory={this.parentSelectCategory} />

            <div className="col-lg-8">
              {items}
            </div>
          </div>
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  searchQuery: store.getState()[0].currentSearchQuery
});

ItemsListed = connect(mapStateToProps)(ItemsListed);


export default ItemsListed;
