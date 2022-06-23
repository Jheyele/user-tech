import { Router } from "express";
import { techsRoutes } from "./techsRoutes.js"
import { usersRoutes } from "./usersRoutes.js"
import { authRoute } from "./authRoutes.js"
const routes = Router();

routes.use("/techs", techsRoutes);
routes.use("/users", usersRoutes);
routes.use("/login", authRoute);


export { routes };
