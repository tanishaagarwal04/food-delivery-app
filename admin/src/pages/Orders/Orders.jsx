import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react';
import axios from "axios";
import {assets} from "../../assets/assets"

const Orders = ({url}) => {

  //first we will create one state variable where we will store the data coming from the API.
  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async () => {
    //in this function we will call the API
    const response = await axios.get(url+"/api/order/list"); //since it is a get request we do not have to pass anything as body and headers
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
  





  //we're linking the /status API, with our admin panel, 
  // Here we will create a functionality, where when we select food status(ex:out for delivery), then it will update the order status in database
  const statusHandler = async(event,orderId) => { //The event parameter represents the event object that is automatically passed when the function is triggered by an event, such as a user selecting a food status from a dropdown or clicking a button.
      //console.log(event,orderId);
      const response = await axios.post(url+"/api/order/status",{
        orderId, //this is the body (json) part in insomnia
        status:event.target.value 
        /*Breaking Down event.target.value
          event → The event object (e.g., a change event from a <select> dropdown)
          event.target → The HTML element that triggered the event (e.g., <select>, <input>, or <button>)
          event.target.value → The value selected or entered in the triggered element */
      })
      if(response.data.success){
        await fetchAllOrders();
      }
  }









  //after that we have to run this function whenever this component will be loaded
  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className='order add'> {/*Two classNames addded here, in order to use the css properties of both .order and .add*/}
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return item.name + " x " + item.quantity //we do not have the , after the last item.
                  }
                  else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
            {/*Now we will create a select option so that we can change the order status, Food Processing, Out for delivery or Delivered. (We can do this since we are working in the Admin Panel*/}
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
