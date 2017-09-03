import React from 'react';
import Header from './reuse/header'


class Home extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <h1> Home </h1>
        </div>
      </div>
    )
  }
};

export default Home;
