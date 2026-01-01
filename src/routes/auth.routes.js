// ------------------- routes/auth.routes.js -------------------
import express from "express";
import { LoginController } from "../controllers/auth.controller.js";
import jwt from "jsonwebtoken";
import { DeleteUserByAdmin, GetAllUsers, GetMyProfileController, GetSingleUserbyAdmin, UpdateUserByAdmin } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multar.middlewares.js";

const router = express.Router();

// Login
router.post("/login", LoginController);

// Refresh token
router.post("/refresh", (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

        res.json({ accessToken: newAccessToken });
    });
});

// Logout
router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
});

// Me
router.get("/me", verifyToken, GetMyProfileController);

// Auth Routes
// Admin only
router.get("/users", verifyToken, verifyAdmin, GetAllUsers);
router.get("/users/:email",verifyToken,verifyAdmin,GetSingleUserbyAdmin);
router.patch("/users/:email",verifyToken,verifyAdmin,upload.single("image"),UpdateUserByAdmin);
router.delete("/users/:email", verifyToken, verifyAdmin, DeleteUserByAdmin);

export default router;
