import express from "express";
import { CreateUserController, GetUserController } from "../controllers/user.controller.js";
import { checkUniqueUser, validateUser } from "../middlewares/validateUser.middlewares.js";


const router = express.Router();


router.get("/get-user",GetUserController);
router.post("/create-user",validateUser,checkUniqueUser,CreateUserController);

export default router;