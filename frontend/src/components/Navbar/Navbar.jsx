import './Navbar.css';
import { assets } from '../../assets/assets';
import { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home")
    const [showSearch, setShowSearch] = useState(false);

    //now here we will also add the token thing, so that we can add the logic using which we can add the profile icon, instead of the sign in button once we are logged in
    const{getTotalCartAmount,token,setToken} = useContext(StoreContext);
    
    //after the user will be logged out we will send them to the home page
    const navigate = useNavigate();
    
    //logout function
    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/") //we will provide the path of the home page, i.e "/"
    }


  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>
        <img src={assets.panda} alt="Panda" className="panda"/>

        <ul className="navbar-menu">
            {/*The Link component is used for internal navigation within a Single Page Application (SPA), such as React apps. These links do not reload the page and use React Router to update the URL and render the appropriate component dynamically. */}
            <Link to='/' onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
            {/*The <a> tag is used for anchor links, which navigate to specific sections within the same page by scrolling to the element with the corresponding id. */}
        </ul>
        
        <div className="navbar-right">
            <div onClick={() => setShowSearch(!showSearch)} className="navbar-search-icon">
                <img src={assets.search_icon} alt="" />
                <p>Search</p>
            </div>
            {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
            <div className="navbar-cart-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" />
                <p>Cart</p></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {/*Here we will check, if the token is not available, then we will provide this button, else we will provide the profile icon*/}
            {!token?(<button onClick={()=>setShowLogin(true)}>sign in</button>)
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr/>
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar
