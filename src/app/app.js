import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hello from "../routes/hello.routes.js";
import users from "../routes/user.routes.js";
import auth from "../routes/auth.routes.js";
import otp from "../routes/otp.routes.js";
import payments from "../routes/payment.routes.js";


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());



// routes used
app.use("/",hello);
app.use("/api",users);
app.use("/api",auth);
app.use("/api",otp);
app.use("/api",payments);


export default app;