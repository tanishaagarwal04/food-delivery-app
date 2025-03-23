import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Crave-worthy dishes are just a click away! Dive into our menu and savor the taste of convenience. </p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                      {/*If the user clicks on a category that is already active, the state resets to "All" to show all items.}
                      {/*If the user clicks on a different category, it updates the state to that category (item.menu_name).*/}
                       <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                       <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
