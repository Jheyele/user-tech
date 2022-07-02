import { Router } from "express";
import TechController from "../controllers/TechController.js";
import ensureAuth from "../middleware/ensureAuth.js";

const techsRoutes = Router();

const techController = new TechController();

techsRoutes.post("/", ensureAuth, techController.createTech);
techsRoutes.get("/", ensureAuth, techController.findAllTechs);
techsRoutes.get("/tech/:id", ensureAuth, techController.findTechById);
techsRoutes.get("/techs-by-user/:id", ensureAuth, techController.findTechsByUser);
techsRoutes.put("/:id", ensureAuth, techController.updateTech);


export { techsRoutes };