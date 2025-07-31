
import { logger } from "@codecompplat/logger"
import { Router } from "express"
import multer from "multer";

const router: Router = Router();

// File handling
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, "/Users/vincent/dev/coding-competition-platform/testing")
    },
    // filename: (req, file, callback) => {
    //   // TODO: custom file filename
    //   callback(null, Date.now().toString())
    // }
  })
})

router.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
})


router.post("/submission", fileUpload.single("file"), (req, res) => {
  res.send("Upload success 3");
});

export { router as submissionRouter }
