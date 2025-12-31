import express from "express";
import { hellocontroller,helloemon} from "../controllers/hello.controller.js";

const router = express.Router();

// router.get("/",async(req,res)=>{
//     res.send("Hello World");
// })
router.get("/",hellocontroller);
router.get("/emon",helloemon);

export default router;