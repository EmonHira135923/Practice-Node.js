import express from "express";
import { CreateUserController, DeleteUserController, GetUserController, GetUserControllerbyId, UpdateUserControllerbyId } from "../controllers/user.controller.js";
import { checkUniqueUser, validateUser } from "../middlewares/validateUser.middlewares.js";
import { uploadImageController } from "../controllers/upload.controller.js";
import upload from "../middlewares/multar.middlewares.js";
import { deleteImageController } from "../controllers/deleteimage.controller.js";


const router = express.Router();

router.post("/create-user",upload.single("image"),validateUser,checkUniqueUser,CreateUserController);
router.get("/get-user",GetUserController);
router.get("/get-user/:email",GetUserControllerbyId);
router.patch("/update-user/:email",upload.single("image"),UpdateUserControllerbyId);
router.delete("/delete-user/:email",DeleteUserController);
router.post("/upload-image",upload.single("image"),uploadImageController)
router.delete("/delete-image",deleteImageController)

export default router;