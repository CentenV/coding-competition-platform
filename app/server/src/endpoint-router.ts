/**
 * @file Contains Express Router factory that is used in the entire backend
 * */

import { logger } from "@codecompplat/logger"
import { Router } from "express";

/**
 * Endpoint Express Router object factory
 *
 * @returns Router: Express Router object to 
 * */
function createEndpointRouter(): Router {
  const router: Router = Router();

  // Logging
  router.use((req, _, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  return router;
}

export { createEndpointRouter }
