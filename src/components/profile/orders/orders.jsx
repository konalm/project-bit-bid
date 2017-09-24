import React from 'react'

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

import Order from './orders-child.jsx'

/**
 * All orders JSX
 */
const AllOrders = ({orders}) => {
  if (!orders) {
    return <div> null </div>;
  }

  return (
    <div>
      {
        Object.keys(orders).map((key, index) => {
          return (
            <Order order={orders[key]} />
          )
        })
      }
    </div>
  )
}

/**
 * Orders JSX
 */
const Orders = ({orders}) => {
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

            <AllOrders orders={orders} />
          </div>
        </div>
      </div>
    </div>
)}

export default Orders;
