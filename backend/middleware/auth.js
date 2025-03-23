//To decode the token, we'll use the middleware, and we will provide the name as authentication middleware(auth.js)
import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers; //we'll get the token from the user using header
    if(!token){ //if the token is not available 
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    //in the following we will decode the token if we have the token and convert it into the user id
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error", error: error.message})
    }
}

export default authMiddleware;