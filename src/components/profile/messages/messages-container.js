import React from 'react';
import { withRouter } from 'react-router-dom'
import requireAuth from '../../../requireAuth'

import MessagesJsx from './messages.jsx'



class Messages extends React.Component {
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
      <MessagesJsx />
    )
  }
}

export default withRouter(Messages);
