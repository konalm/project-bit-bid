import React from 'react';
import { withRouter } from 'react-router-dom'

import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import { connect } from 'react-redux'
import store from '../../store'
import { changeSearchQuery } from '../../store/actions'

import {http} from '../../http-requests'
import requireAuth from '../../requireAuth'

import LoginModal from './login-modal'

window.jQuery = window.$ = $;
require('bootstrap');


class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      loginMessage: ''
    }

    this.loginMessage = '';
  }

  /***
    handlers
  ****/
  handleSearchChange = (event) => {
    this.setState({search: event.target.value});
  }

  /**
   * dispatch search query to redux store
   */
  submitSearch = (e) => {
    e.preventDefault();
    store.dispatch(changeSearchQuery(this.state.search));
  }

  /**
   * go to profile if logged in, else show login modal box
   */
  goToProfile = (event) => {
    event.preventDefault();

    requireAuth()
      .then(() => { this.props.history.push('/profile'); })
      .catch(() => {
        this.triggerLoginModalBox('Must be Logged in to access profile.');
      })
  }

  /**
   * go to list item
   */
  goToListItem = (event) => {
    event.preventDefault();

    requireAuth()
      .then(() => { this.props.history.push('/list-item'); })
      .catch(() => {
        this.triggerLoginModalBox('Must be logged in to list item.');
      })
  }

  /**
   * trigger login modal box
   */
  triggerLoginModalBox = (message) => {
    this.setState({loginMessage: message});
    $('#loginModal').modal('show');
  }

  render() {
    return (
      <div>
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

                <li onClick={this.goToListItem}>
                  <a>List Item</a>
                </li>
              </ul>

              <form
                className="navbar-form navbar-left"
                role="search"
                onSubmit={this.submitSearch}
              >
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
                <li onClick={(event) => this.goToProfile(event)}>
                  <a> Profile </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <LoginModal message={this.state.loginMessage} />
      </div>
    );
  }
}

export default withRouter(Header);
