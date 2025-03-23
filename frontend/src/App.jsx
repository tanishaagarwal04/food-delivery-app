import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/home";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes> {/*So these the different pages basically*/}
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} /> {/*this page opens after the payment is completed successfully*/}
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App;
