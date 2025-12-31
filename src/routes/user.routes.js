import express from "express";
import { CreateUserController, DeleteUserController, GetUserController, GetUserControllerbyId, UpdateUserControllerbyId } from "../controllers/user.controller.js";
import { checkUniqueUser, validateUser } from "../middlewares/validateUser.middlewares.js";


const router = express.Router();

router.post("/create-user",validateUser,checkUniqueUser,CreateUserController);
router.get("/get-user",GetUserController);
router.get("/get-user/:email",GetUserControllerbyId);
router.patch("/update-user/:email",UpdateUserControllerbyId);
router.delete("/delete-user/:email",DeleteUserController);


export default router;