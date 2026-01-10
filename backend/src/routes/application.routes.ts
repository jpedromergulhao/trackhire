import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createApplication, deleteApplication, editApplication, listApplications } from "../controllers/application.controller";

const applicationsRouter = Router();

applicationsRouter.get("/", authMiddleware, listApplications);
applicationsRouter.post("/", authMiddleware, createApplication);
applicationsRouter.put("/:id", authMiddleware, editApplication);
applicationsRouter.delete("/:id", authMiddleware, deleteApplication);

export default applicationsRouter;