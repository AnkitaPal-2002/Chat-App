import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./lib/db.js";

import userAuthRoutes from "./routes/user/userAuth.route.js";
import messageRoutes from "./routes/message/message.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user/auth", userAuthRoutes);
app.use("/api/message", messageRoutes);

app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
    connectDB();

})

