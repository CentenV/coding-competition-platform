// API Router //
// Express router for piping to the API endpoints
import { Router } from "express";
import problemsEndpoint from "./user/problems";
import adminRouter from "./admin/admin";

const router = Router();

// Rest API mappings
router.use("/problems", problemsEndpoint);
router.use("/admin", adminRouter);

export default router;