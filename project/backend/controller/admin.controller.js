import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getAdminData = async (req, res) => {
    try {
        const adminData = await User.find({ role: "Admin" });
        res.status(200).json({ success: true, data: adminData });
        
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};