import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//APIs for add, list & remove food (total 3)

//add food item 
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "Image upload failed" });
        }

        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price), // Ensure price is a number
            image: req.file.filename, // Save only the filename
            category: req.body.category
        });

        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error in addFood:", error);
        res.json({ success: false, message: "Error saving food item", error: error.message });
    }
};

//all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id); //id created by mongoDB automatically, using that, the food item to remove will be accessed & stored in this variable.  
        fs.unlink(`backend/uploads/${food.image}`,()=>{}) //using this line we can delete the image from the uploads folder

        await foodModel.findByIdAndDelete(req.body.id);//using the id, this line deletes the product data from the MongoDb database
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error",error: error.message})
    }
}

export { addFood , listFood, removeFood};
