import express from 'express';
import User from '../../models/user.model.js';

const getAllUsers = async (req, res) =>{
    try{
        // console.log(req.user);
        
        // console.log("Current User ID:", req.user._id);
        
        const currentUserId = req.user._id;
        const users = await User.find({ _id: { $ne: currentUserId } })
            .select('-password')

        res.status(200).json(users);

    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getAllUsers };