import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

export default healthRoutes;