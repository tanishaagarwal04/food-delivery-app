import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  

  //we will create the state variable, where we will store the info from the form input field
  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"", 
    phone:"" 
  })

  //after that we will create the onChangeHandler function, using that we will save the input field data in this state variable (above)
  const onChangeHandler = (event) => {
    const name = event.target.name; //gets the name attribute of the input field.
    const value = event.target.value; //gets the current value of the input field.
    setData(data=>({...data,[name]:value})) //{ ...data } (Spread Operator) → This copies all existing properties from data into a new object.
  }

  //we'll verify all the changes using below..
  /*useEffect (()=>{
    console.log(data);
  },[data]) */

  //after that we'll create the arrow function and the name will be place order, using that when we click on Proceed to Payment button on the order page, we'll be redirected to the payment gateway
  const placeOrder = async(event) => {
    event.preventDefault(); //it will not reload the webpage whenever we will submit this form
    let orderItems = []; //array in which we will put the cart items related data
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item; //from food_list in assets.js
        itemInfo["quantity"] = cartItems[item._id] //we'll add one property i.e qunatity
        orderItems.push(itemInfo)
      }
    })
    //console.log(orderItems); no need for importing useEffect module for this, just click proceed to payment for this
    let orderData = {
      address:data, //we have the data state variable at the start of this file
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    //now we will send this order data from our API
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})//backend url
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

   
  


  //now we will add the logic using which we once we logout, we cannot see the order page until we login again, we will hide it

  const navigate = useNavigate();


  useEffect(()=>{
    if(!token){
      //whenever this block will be executed we will be navigated to the cart page
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token]) //it will be executed whenever our token gets updated






  return (                                   
    <form onSubmit={placeOrder} className='place-order'>
      {/*left hand side*/}1
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      {/*right hand side*/}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
    
  )
}

export default PlaceOrder
