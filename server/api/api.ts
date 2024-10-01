// API Router //
// Express router for piping to the API endpoints
import { Router } from "express";
import problemsEndpoint from "./problems";
import adminProblemsEndpoint from "./admin/problems";

const router = Router();

// Rest API mappings
router.use("/problems", problemsEndpoint);
router.use("/admin/problems", adminProblemsEndpoint);

export default router;