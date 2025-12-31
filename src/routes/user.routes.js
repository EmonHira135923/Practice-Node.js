import express from "express";
import { CreateUserController, GetUserController, GetUserControllerbyId } from "../controllers/user.controller.js";
import { checkUniqueUser, validateUser } from "../middlewares/validateUser.middlewares.js";


const router = express.Router();


router.get("/get-user",GetUserController);
router.get("/get-user/:email",GetUserControllerbyId);
router.post("/create-user",validateUser,checkUniqueUser,CreateUserController);

export default router;