import express from "express";
import Message from "../../models/message.model.js";
import User from "../../models/user.model.js";
import cloudinary from "../../lib/cloudinary.js";


const getUsersForSideBar = async (req, res) => {

}

const getMessages = async (req, res) => {

    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    try{
       const messages = await Message.find({
        $or:[
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myId}
        ]
       });

       res.status(200).json(messages);


    }catch(error){
        console.error("Internal error");
    }
}

const sendMessages = async(req, res) =>{
    try{
        const{ text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadRedponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadRedponse.secure_url;
        }

        const newMessage = await Message({
            senderId,
            receiverId,
            text,
            picture: imageUrl
        })

        await newMessage.save();

        //todo: realtime functuionality goes here => socket.io

        res.status(200).json(newMessage);


    }catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({
            error: "internal server error"
        })
        
    }
}

export{
    getUsersForSideBar,
    getMessages, 
    sendMessages
}