/**
 *
 * */

import { logger } from "@codecompplat/logger"
import { Service } from "@codecompplat/service"

class SubmissionIngressProcessor extends Service {
  constructor() {
    super("SubmissionIngressProcessor")
  }

  public cycle(): void {
    logger.info("cycle() called");
  }
}


// main
const SUBMISSION_INGRESS_PROCESSOR = new SubmissionIngressProcessor();
SUBMISSION_INGRESS_PROCESSOR.start()
