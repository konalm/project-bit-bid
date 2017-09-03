import React from 'react';
import {http} from '../../http-requests'

import Header from '../reuse/header'
import ProfileSidebar from './profile-sidebar'


class ProfileMessages extends React.Component {
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
              <h3>Messages</h3>
              <br />
              inbox
              <br />
              outbox
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileMessages;
