import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "Unauthorized - no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({ message: "Unauthorized - user not found" });
        }

        req.user = user;

        next();

    }catch(error){
        return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
}