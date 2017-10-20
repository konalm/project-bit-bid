import React from 'react';
import ActivityJsx from './activity.jsx'
import requireAuth from '../../../requireAuth'


class ActivityFeed extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    }

    this.checkUserIsLoggedIn();
  }

  /**
   * send request to the Api to check if user is logged in
   */
  checkUserIsLoggedIn = () => {
    requireAuth()
      .then(() => { this.setState({loggedIn: true}); })
      .catch(() => { this.props.history.push('/login'); })
  }

  render() {
    if (!this.state.loggedIn) { return null; }

    return (
      <ActivityJsx />
    )
  }
}

export default ActivityFeed;
