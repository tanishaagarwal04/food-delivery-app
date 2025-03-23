import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
               <img className="logo" src={assets.transparent_logo} alt="" />
                <p>Experience the magic of flavors with Taste Buds. Your satisfaction, our priority. Serving happiness on a plate every day!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-7080809918</li>
                    <li>contact@tastebuds.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 © TasteBuds.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
