import React from 'react'

import SidebarJsx from './sidebar.jsx';


class ProfileSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {
        name:'Account',
        link: '/profile/account'
      },
      {
        name: 'Acivity',
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
      },
      {
        name: 'Sales',
        link: '/profile/sales'
      }
    ]
  }

  render() { return ( <SidebarJsx menuItems={this.menuItems} /> ) }
}

export default ProfileSidebar;
