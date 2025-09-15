

import type { Router } from "express"
import { createEndpointRouter } from "@/endpoint-router.js";
import { submissionRouter } from "./submission/submission.ts";

const router: Router = createEndpointRouter();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "hello world"
  })
});

router.use(submissionRouter)

export { router as apiRouter }
