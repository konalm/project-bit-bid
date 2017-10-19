import React from 'react';
import {Link, NavLink} from 'react-router-dom'

/**
 * Menu Items JSX
 */
const MenuItems = ({props}) => {
  return (
    <ul className="nav nav-pills nav-stacked mt4">
      {
        Object.keys(props.menuItems).map((key) => {
          return (
            <li>
              <Link to={props.menuItems[key].link} activeClassName="active">
                {props.menuItems[key].name}
              </Link>
            </li>
          )
         })
      }
    </ul>
  )
}

/**
 * Sidebar JSX
 */
const Sidebar = (props) => {
  return (
    <div className="col-lg-3 col-md-3 col-sm-4">
      <MenuItems props={props} />
    </div>
  )
}

export default Sidebar;
