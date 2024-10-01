// ADMIN ROUTER //
// Express router for admin only routes
import { Router } from "express";
import adminProblemsEndpoint from "./problems";

const router = Router();

// Rest API mappings
router.use("/problems", adminProblemsEndpoint);

export default router;