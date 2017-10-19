import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import Header from '../reuse/header'
import axios from 'axios'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMenu: 'account'
    }

    this.userId = this.props.match.params.userId;
    this.getUserData = this.getUserData.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  getUserData() {
    console.log('get user data');

    axios.get(`http://localhost:8080/api/users/${this.userId}`)
  }

  selectTab(selectedMenu) {
    this.setState({currentMenu: selectedMenu});
  }

  render() {
    let currentMenu = this.state.currentMenu;
    let currentView = null;

    if (currentMenu === 'account') {
      currentView =
        <div>
          <h3>Account</h3>
          <br />
          Unique Identifier:
          <br />
          Full Name:
          <br />
          Email Address:
          <br />
          BitCoin Wallet:
        </div>
    }

    if (currentMenu === 'messages') {
      currentView =
        <div>
          <h3>Messages</h3>
          <br />
          inbox
          <br />
          outbox
        </div>
    }

    if (currentMenu === 'activity') {
      currentView =
        <div>
          <h3>Activity</h3>
          <br />
          purchases
          <br />
          bids
          <br />
          sales
          <br />
          ratings
          <br />
          rated
        </div>
    }

    return (
      <div>
        <Header />
        <div className="container">
          <h1>Profile</h1>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4">
              <ul className="nav nav-pills nav-stacked">
                <li onClick={() => this.selectTab('activity')}>
                  <a href="#">Activity</a>
                </li>

                <li onClick={() => this.selectTab('messages')}>
                  <a href="#">Messages</a>
                </li>

                <li onClick={() => this.selectTab('account')}>
                  <a href="#">Account</a>
                </li>

                <li onClick={() => this.selectTab('address')}>
                  <a href="#">Address</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3">
              {currentView}
            </div>
          </div> {/* row */}
        </div>
      </div>
    )
  }
};

export default Profile;
