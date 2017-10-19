import React from 'react';

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

const Activity = (props) => {
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
            <p className="lead mt4">Unique Identifier: {props.username} </p>
            <p className="lead">Email Address: {props.emailAddress} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity;
