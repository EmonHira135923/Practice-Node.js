import express from "express";
import cors from "cors";
import hello from "../routes/hello.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// routes used
app.use("/api",hello);


export default app;