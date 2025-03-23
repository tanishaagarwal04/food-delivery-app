import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    //const [userInfo, setUserInfo] = useState({ name: '', email: '' });

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    /*const fetchUserInfo = async () => {
        try {
            const response = await axios.get(url + "/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
            
            if (response.data.success && response.data.data) {
                setUserInfo(response.data.data);
            } else {
                console.error("Failed to fetch user info:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };*/

    useEffect(() => {
        if (token) {
            fetchOrders();
            //fetchUserInfo();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            {/*<div className="user-info">
                <p>Name: {userInfo.name}</p>
                <p>Email-id: {userInfo.email}</p>
            </div>*/}
            <h2>My Orders</h2>
            <div className="container">
                {orders.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Parcel" />
                        <p>{order.items.map((item, idx) => (
                            idx === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `
                        ))}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
