import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {http} from '../../http-requests'

import Header from '../reuse/header'
import ProfileSidebar from './profile-sidebar'


class ProfileAccount extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <div className="row">
            <h2>Profile</h2>
            <hr />
          </div>

          <div className="row">
            <ProfileSidebar />

            <div className="col-lg-8">
              <h3>Account</h3>
              Unique Identifier:
              <br />
              Full Name:
              <br />
              Email Address:
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAccount;
