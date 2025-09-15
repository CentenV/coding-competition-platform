
import "dotenv/config"
import { getEnvConfig } from "@codecompplat/config-env"
import type { Router } from "express"
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { createEndpointRouter } from "@/endpoint-router.js";

const router: Router = createEndpointRouter();

// File handling
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, getEnvConfig({ envVariableName: "SUBMISSION_BASE_DIR" }));
    },
    filename: (req, file, callback) => {
      const id = uuidv4();
      callback(null, id);
    }
  })
})

router.post("/submission", fileUpload.single("file"), (req, res) => {
  res.send("Upload success 3");
});

export { router as submissionRouter }
