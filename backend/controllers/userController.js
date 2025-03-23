//now we will create the user-authentication system that will allow user to login or register on the webpage
//here we will create the login and sign-off logic

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken" //using this we will create the authentication system
import bcrypt from "bcryptjs" //it encrypts the user data & stores it in the database
import validator from "validator" //checks if the password or e-mail is valid or not


//APIs for login user and register user (total 2)

//login user
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password); //returns true if password matches else false
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        //if the password is matching
        const token = createToken(user._id);
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,messsage:"Error",error: error.message})
    }
}

//create token
const createToken = (id) => { //user's id will be self generated in the Mongodb database
   return jwt.sign({id},process.env.JWT_SECRET)
}


//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //checking if user already exists wuth this email id
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }


        //following will be executed if both email and passowrd are valid

        /* hashing user password (Hashing is widely used for securely storing passwords in a database.)*/
        const salt = await bcrypt.genSalt(10) //we can set this range from 5-15,generates a random string (salt) with 10 rounds of complexity to make hashed passwords unique and secure.
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating new user using the name, email and hashed password
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error",error: error.message})
    }
    //so now we have created to API to create the user
}

//did not use the below two apis just created for trial purpose
// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { name: 1, email: 1 }); // Fetch only name & email
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching users", error: error.message });
    }
};


// Fetch current logged-in user
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id, { name: 1, email: 1 }); // Fetch only name & email

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user", error: error.message });
    }
};



export {loginUser,registerUser,getAllUsers,getCurrentUser}


//after creating both APIs, we have to integrate this login and sign up API with the frontend.