// ------------------- controllers/auth.controller.js -------------------
import { getUserCollection } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginController = async (req, res) => {
    try {
        const userCollection = getUserCollection();
        const { email, password } = req.body;
        console.log("REQ BODY:", req.body);
        
        

        const user = await userCollection.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) return res.status(400).json({ message: "Password incorrect" });

        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

        const refreshToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        res.status(200).json({ message: "Logged in successfully", accessToken });

    } catch (err) {
        console.error("Login Error:", err);  // 🔥 add this
        res.status(500).json({ message: "Login failed", err });
    }
};
