import React from 'react';
import {http} from '../../http-requests'

import Header from '../reuse/header'
import ProfileSidebar from './profile-sidebar'


class ProfileActivity extends React.Component {
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
              <h3>Activity</h3>
              <br />
              purchases:
              <br />
              bids:
              <br />
              sales:
              <br />
              ratings:
              <br />
              rated:
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileActivity;
