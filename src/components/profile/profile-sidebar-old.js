import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {http} from '../../http-requests';

class ProfileSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {
        name:'Account',
        link: '/profile/account'
      },
      {
        name: 'Activity',
        link: '/profile/activity'
      },
      {
        name: 'Messages',
        link: '/profile/messages'
      },
      {
        name: 'Address',
        link: '/profile/address'
      },
      {
        name: 'Billing',
        link: '/profile/billing'
      },
      {
        name: 'Orders',
        link: '/profile/orders'
      }
    ]
  }



  render() {
    return (
      <div className="col-lg-3 col-md-3 col-sm-4">
        <br />
        <ul className="nav nav-pills nav-stacked">
          <li>
            <Link to="/profile/account" activeClassName="active">
              Account
            </Link>
          </li>

          <li>
            <Link to="/profile/activity" activeClassName="active">
              Activity
            </Link>
          </li>

          <li>
            <Link to="/profile/messages" activeClassName="active">
              Messages
            </Link>
          </li>


          <li>
            <Link to="/profile/address" activeClassName="active">
              Address
            </Link>
          </li>

          <li>
            <Link to="/profile/billing" activeClassName="active">
              Billing
            </Link>
          </li>

          <li>
            <Link to="/profile/orders" activeClassName="active">
              Orders
            </Link>
          </li>

          <li>
            <Link to="/profile/sales" activeClassName="active">
              Sales
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default ProfileSidebar;
