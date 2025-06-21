import express from "express";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "../../lib/cloudinary.js";
import { generateToken } from "../../lib/utils.js";

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;


        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        // Save user to database
        await newUser.save();

        if (newUser) {
            //generate JWT token
            generateToken(newUser._id, res);
            // Send response
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } else {
            res.status(400).json({ message: "User registration failed" });
        }


    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        //generate JWT token
        generateToken(existingUser._id, res);
        // Send response
        res.status(200).json({ message: "User logged in successfully", user: existingUser });

    } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Logic to logout a user
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user" });
    }
}

const updateProfile = async (req, res) => {
    //console.log("updateProfile called");
    try {
        //console.log(req.body);
        
        const { profilePic } = req.body;
        const userId = req.user.id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Update user profile
        // Use { new: true } to return the updated user document after the profilePic is changed.
        // Without this, it would return the original document before the update.
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }); 

        res.status(200).json({
            message: "Profile updated successfully",
            user: updateUser,
        });


    } catch (error) {
        console.log("Error updating profile:", error);
        
        res.status(500).json({ message: "Error updating profile" });
    }


}

const checkAuth = async (req, res) =>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User authenticated", user });
    } catch (error) {
        res.status(500).json({ message: "Error checking authentication" });
    }

}



export {
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
    checkAuth
}
