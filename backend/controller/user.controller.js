import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({success:true, data:users});
    } catch (error) {
        console.log("error in fetching users:", error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if(!user.firstname || !user.lastname || !user.email || !user.phone || !user.password || !user.street || !user.city || !user.postalcode || !user.province || !user.avatar || !user.role) {
        return res.status(400).json({success:false, message: "Please fill all the fields"});
    }

    const newUser = new User(user);

    try{
        newUser.save();
        return res.status(201).json({success:true, message: "User created successfully"});

    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
      res.status(200).json({ success: true, data: updatedUser });

    }catch(error) {
        res.status(500).json({success:false, message: "Internal server error"});
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({success:false, message: "Invalid user ID"});
    }

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({success:true, message: "User deleted successfully"});

    } catch (error) {
        res.status(500).json({success:false, message: "Internal server error"});
    }
}