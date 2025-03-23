//here we will create multiple routes
import express from "express" //used to include the Express library in the project
import { getAllUsers, getCurrentUser, loginUser,registerUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router()
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/users", getAllUsers); // New API to fetch all users (not used)
userRouter.get("/me",authMiddleware, getCurrentUser); // Fetch current logged-in user (NEW) (not used)


export default userRouter;







