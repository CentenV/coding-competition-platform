

import { Router } from "express"
import { submissionRouter } from "./submission/submission";

const router: Router = Router();

router.use(submissionRouter)

export { router as apiRouter }
