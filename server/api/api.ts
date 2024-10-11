// API Router //
// Express router for piping to the API endpoints
import { Router } from "express";
import problemsEndpoint from "./public/problems";
import sandboxEndpoint from "./public/sandbox";
import adminProblemsEndpoint from "./admin/problems";
import adminExecutionCaseEndpoint from "./admin/executioncases";

// External Rest API mappings 
const adminRouter = Router();
adminRouter.use("/problems", adminProblemsEndpoint);
adminRouter.use("/executioncases", adminExecutionCaseEndpoint);
const submissionRouter = Router();
submissionRouter.use("/sandbox", sandboxEndpoint);

// Root Rest API mappings
const router = Router();
router.use("/admin", adminRouter);
router.use("/problems", problemsEndpoint);
router.use("/submission", submissionRouter);


export default router;