import React from 'react';

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

const Activity = (pros) => {
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
            <h3>Activity Feed</h3>
            <p className="lead mt4">Activity Feed coming in future build</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity;
