import express from "express"  //Express provides robust routing to define different URL paths (routes) and how they should respond to client requests.
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter; //this line is written to export the cartRouter object so that it can be imported and used in another file.authMiddleware,