// ------------------- middlewares/auth.middleware.js -------------------
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded; // include role
        next();
    });
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
    next();
};
