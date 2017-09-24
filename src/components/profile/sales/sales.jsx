import React from 'react'

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

import Sale from './sales-child.jsx'

/**
 * All sales JSX
 */
const AllSales = ({sales}) => {
  if (!sales) {
    return <div> null </div>;
  }

  return (
    <div>
      {
        Object.keys(sales).map((key, index) => {
          return <Sale sale={sales[key]} />
        })
      }
    </div>
)}

/**
 * Sales JSX
 */
const Sales = ({sales}) => {
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
            <h3>Sales</h3>
            <br /> <br />

            <AllSales sales={sales} />
          </div>
        </div>
      </div>
    </div>
)}

export default Sales;
