import mongoose from "mongoose"
const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
}) 

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;
/*
mongoose.models is an object that stores all the models that have already been created in the Mongoose instance.
If a model with the name "order" already exists, mongoose.models.order will return that model.
If the model "order" does not already exist, this creates a new model using the provided orderSchema and registers it with the name "order".
*/
