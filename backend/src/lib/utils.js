import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId, res) =>{
    try{
        //console.log("Generating token for user ID:", userId);
        
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        
        res.cookie("jwt", token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie and helps mitigate XSS attacks
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
            sameSite: 'Strict', // Helps prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day

        })

        return token;
    }catch(error){
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }


}