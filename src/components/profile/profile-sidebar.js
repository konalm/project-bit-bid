import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {http} from '../../http-requests';


class ProfileSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMenu: 'account'
    }

    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(selectedMenu) {
    this.setState({currentMenu: selectedMenu});
  }

  render() {
    return (
      <div className="col-lg-3 col-md-3 col-sm-4">
        <br />
        <ul className="nav nav-pills nav-stacked">
          <li>
            <Link to="/profile/activity">Activity</Link>
          </li>

          <li>
            <Link to="/profile/messages">Messages</Link>
          </li>

          <li>
            <Link to="/profile/account">Account</Link>
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
        </ul>
      </div>
    )
  }
}

export default ProfileSidebar;
