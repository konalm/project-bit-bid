import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {http} from '../../http-requests'

import Header from '../reuse/header'


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }

    this.getUserProfile = this.getUserProfile.bind(this);
    this.getUserProfile();
  }

  getUserProfile() {
    http.get(`users-profile/${this.props.match.params.username}`)
      .then(res => {
        this.setState({user: res.data});
      });
  }

  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h1> { this.state.user.username } </h1>
        <h3> { this.state.user.email } </h3>

        <br /> <br />

        <h3> Rating : 5 </h3>
        <h3> Feedback: 19 </h3>
        <h3> Previous Sales: 21 </h3>
        <br />
        <button className="btn btn-primary">Message</button>
      </div>
      </div>
    )
  }
}

export default UserProfile
