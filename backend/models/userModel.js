//we will define the model of our user
import mongoose from "mongoose";

/* userSchema is commonly used in database systems and programming frameworks to describe how user information will be stored, validated, and managed.*/
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true}, /*here the unique:true property means that we can create only one acc w one e-mail id*/
    password:{type:String,required:true},
    cartData:{type:Object,default:{}} //here we will manage the users cart
},{minimize:false}) // the {minimize:false} property is added so that the cartData entry is created without any data 

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;








