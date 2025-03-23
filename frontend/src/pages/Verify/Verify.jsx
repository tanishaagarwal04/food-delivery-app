import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {

  //we'll create the logic using which we can get the parameters success true.., orderId etc
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success"); //we'll get the true value stored in this success variable
  const orderId = searchParams.get("orderId");
  //console.log(success,orderId); so in these variables we are getting the data
  const { url } = useContext(StoreContext); //Backend url "http://localhost:4000"
  const navigate = useNavigate();



  const verifyPayment = async() => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
        //if this is true, then in that case we will navigate the users on different route, /myorders (we'll create later)
        navigate("/myorders")
    }
    else{
        navigate("/") //if the payment is failed then we will navigate the users on the home page
    }
  }

  useEffect(() =>{
    verifyPayment();
  },[])




  return (
    <div className="verify">
      <div className="spinner"> {/*the spinner will be displayed until the payment will be verified*/}

      </div>
    </div>
  );
};

export default Verify;
