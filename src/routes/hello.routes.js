import express from "express";
import {CreateUser, GetUser, hellocontroller,helloemon} from "../controllers/hello.controller.js";

const router = express.Router();

// router.get("/",async(req,res)=>{
//     res.send("Hello World");
// })
router.get("/",hellocontroller);
router.get("/emon",helloemon);
router.post("/create-user",CreateUser);
router.get("/get-user",GetUser);

export default router;