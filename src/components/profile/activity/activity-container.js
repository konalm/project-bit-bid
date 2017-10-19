import React from 'react';
import ActivityJsx from './activity.jsx'

console.log('FUCK YOU');

class ActivityFeed extends React.Component {
  constructor() {
    super();
    console.log('activity feed !!!!!');
  }

  render() {
    return (
      <ActivityJsx />
    )
  }
}

export default ActivityFeed;
