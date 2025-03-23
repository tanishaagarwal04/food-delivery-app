import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            {/*due to using NavLink we have active class name on the one we select while using inspect element at 4:53:30 hrs in vid*/}
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
