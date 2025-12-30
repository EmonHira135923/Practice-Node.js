import dotenv from "dotenv";
dotenv.config();
import app from "./app/app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || "3000";

// db called
const startServer = async () => {
  await connectDB(); // 🔥 MUST CALL
  
  app.listen(port, () => {
    console.log(`User Management System running on port ${port}`);
  });
};

startServer();