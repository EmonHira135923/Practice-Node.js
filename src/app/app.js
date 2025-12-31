import express from "express";
import cors from "cors";
import hello from "../routes/hello.routes.js";
import users from "../routes/user.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// routes used
app.use("/",hello);
app.use("/api",users);


export default app;