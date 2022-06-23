import { Router } from "express";
import UserController from "../controllers/UserController.js";
import ensureAuth from "../middleware/ensureAuth.js";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.createUser);
usersRoutes.get("/", userController.findAll);
usersRoutes.get("/:id", userController.findUserById);
usersRoutes.put("/:id", ensureAuth, userController.updateUser);
usersRoutes.delete("/:id", ensureAuth, userController.deleteUser);

export { usersRoutes };