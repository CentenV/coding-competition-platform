/**
 * @file Coding Competition Platform - Rest API Server
 *
 * */
import 'dotenv/config'
import { logger } from "@codecompplat/logger"
import express from "express"
import { apiRouter } from "./api/api.js";

// Application port
// const PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
const PORT = "3001";
// Application mode
// const DEV = process.env.NODE_ENV !== "production";

const server = express();

server.use(apiRouter)

server.listen(PORT, () => {
  logger.info(`Started Coding-Competition-Platform Server - Listening on port ${PORT}`)
});

