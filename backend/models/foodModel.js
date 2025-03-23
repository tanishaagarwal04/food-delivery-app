import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    category: {type:String,required:true}
})

//if the model is already there, it will use the already existing model, otherwise it will make a new model.
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;

//after this we will create the APIs, using which we can add new food items in our database

