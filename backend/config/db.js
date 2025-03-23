import mongoose from "mongoose";
export const connectDB = async () => { //The connectDB function is an asynchronous function that connects the application to a MongoDB database.
    //use %40 instead of @ in your password (url encoded rule)
     try{
        await mongoose.connect('mongodb+srv://greatstack:Tanisha%4004@cluster0.xoo9x.mongodb.net/food-delivery',{ //Establishes a connection to the MongoDB database using the provided useNewUrlParser: true, //Enables the new MongoDB connection string parser.
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    }
    catch(error) {
        console.error("DB Connection error:",error.message);
        process.exit(1);
    }
};
   