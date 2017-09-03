import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import { connect } from 'react-redux'
import store from '../../store'
import { changeSearchQuery } from '../../store/actions'

import axios from 'axios';


class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      search: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  /***
    handlers
  ****/
  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  /**
   * dispatch search query to redux store
   */
  submitSearch(e) {
    e.preventDefault();
    console.log('submit search')
    console.log(this.state.search);
    console.log('DISPATCH');
    store.dispatch(changeSearchQuery(this.state.search));
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Project Bit Bid
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/items-listed" activeClassName="active">
                  Listed Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/list-item" activeClassName="active">
                  List Item
                </NavLink>
              </li>
            </ul>

            <form className="navbar-form navbar-left" role="search" onSubmit={this.submitSearch}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={this.handleSearchChange}
                />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
