import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// Middleware to validate food data
const validateFoodData = (req, res, next) => {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    next();
};

// Set up router
const foodRouter = express.Router();

// POST /api/food/add
foodRouter.post("/add", upload.single("image"), validateFoodData, addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;
