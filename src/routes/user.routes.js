// import express from "express";
// import { CreateUserController, DeleteUserController, GetUserController, GetUserControllerbyId, UpdateUserControllerbyId } from "../controllers/user.controller.js";
// import { checkUniqueUser, validateUser } from "../middlewares/validateUser.middlewares.js";
// import { uploadImageController } from "../controllers/upload.controller.js";
// import upload from "../middlewares/multar.middlewares.js";
// import { deleteImageController } from "../controllers/deleteimage.controller.js";


// const router = express.Router();

// router.post("/create-user",upload.single("image"),validateUser,checkUniqueUser,CreateUserController);
// router.get("/get-user",GetUserController);
// router.get("/get-user/:email",GetUserControllerbyId);
// router.patch("/update-user/:email",upload.single("image"),UpdateUserControllerbyId);
// router.delete("/delete-user/:email",DeleteUserController);
// router.post("/upload-image",upload.single("image"),uploadImageController)
// router.delete("/delete-image",deleteImageController)


// export default router;

// ------------------- routes/user.routes.js -------------------
import express from "express";
import { CreateUserController, DeleteUserController, GetUserController, GetUserControllerbyId, UpdateUserControllerbyId } from "../controllers/user.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validateUser, checkUniqueUser } from "../middlewares/validateUser.middlewares.js";
import upload from "../middlewares/multar.middlewares.js";

const router = express.Router();

// Create user (default role = "user")
router.post("/create-user", upload.single("image"), validateUser, checkUniqueUser, CreateUserController);

// Get all users → logged-in users only
router.get("/get-user", verifyToken, GetUserController);

// Get user by email → logged-in users only
router.get("/get-user/:email", verifyToken, GetUserControllerbyId);

// Update user → logged-in users only
router.patch("/update-user/:email", upload.single("image"), verifyToken, UpdateUserControllerbyId);

// Delete user → admin only
router.delete("/delete-user/:email", verifyToken, verifyAdmin, DeleteUserController);

export default router;
