import React, { /*useEffect,*/ useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    //here we have to fetch the url using the context API
    const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Sign Up")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    //for user login we will create one function
    const onLogin = async (event) => {
        event.preventDefault()      //prevents the webpage from reloading, when we click on login or create account 
        //now we will add the logic using which we can call the APIs
        let newUrl = url;
        if(currState === "Login") {
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)//after this we will be successfully logged in //we'll save the token in local storage
            setShowLogin(false) //this will hide the login page
        }
        else{
            alert(response.data.message) //this will be executed when response.data.success will be false
        }
    } 


    //so the handler for the input field is perfectly working
    /*useEffect(() =>{
        console.log(data);
    },[data])*/  //whenever the data will be updated, this function will be executed

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); /*negates the current state of password*/
    };


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <div className="password-input-container">
                    <input name='password' onChange={onChangeHandler} value={data.password} type={passwordVisible?"text":"password"} placeholder="Password" required />
                    <button type='button' id="togglePassword" aria-label="Toggle password visibility" onClick={togglePasswordVisibility} >
                        {passwordVisible?'❌' : '👀'}
                    </button>
                </div>
            </div>
            <button type='submit' className="createORlogin-button">{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>  
    </div>
  )
}

export default LoginPopup
