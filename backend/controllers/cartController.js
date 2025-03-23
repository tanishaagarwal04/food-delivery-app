//we will add the logic using which if we add any item in the cart then that item will be saved in the database.
//create API by which we can add the cart data in the database.
import userModel from "../models/userModel.js"

//APIs for add items, remove items & fetch user cart data (total 3)

//add items to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); //This line is fetching the user's document from the database using the user ID (req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1; //create new entry
        }
        else
        {
            cartData[req.body.itemId] += 1; //increment the qty.
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData}); //this statement will update the cart data in the database
        res.json({success:true,message:"Added To Cart"}); //after that, we'll generate one response with success true...
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error", error:error.message})
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId) //we will get this user id from our middleware, that will decode our token and convert it into the user id
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error",error:error.message})
    }
}

//fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        //after that from this user data we will extract the cart data
        let cartData = await userData.cartData;
        res.json({success:true,cartData})        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error",error:error.message})
    }
}

export {addToCart,removeFromCart,getCart}

//now we have to integrate these APIs with our frontend