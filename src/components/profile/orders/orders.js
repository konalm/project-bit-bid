import React from 'react'
import {http} from '../../../http-requests'

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

class orders extends React.Component {
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
              <h3>Orders</h3>

              <br /> <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default orders;
