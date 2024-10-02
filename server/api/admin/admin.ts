// ADMIN ROUTER //
// Express router for admin only routes
import { Router } from "express";
import adminProblemsEndpoint from "./problems";
import adminExecutionCaseEndpoint from "./executioncases";

const router = Router();

// Rest API mappings
router.use("/problems", adminProblemsEndpoint);
router.use("/executioncases", adminExecutionCaseEndpoint);

export default router;