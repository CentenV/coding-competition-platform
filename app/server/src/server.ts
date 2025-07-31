// Coding Competition Platform - Rest API Server //
import { logger } from "@codecompplat/logger"
import express from "express"
import { apiRouter } from "./api/api.js";

// Application port
// const PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
const PORT = "3001";
// Application mode
// const DEV = process.env.NODE_ENV !== "production";

const server = express();


server.get("/", (_req, res) => {
    res.send("hello world");
});

server.use(apiRouter)
server.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
})

server.listen(PORT, () => {
  logger.info(`Started Coding-Competition-Platform Server - Listening on port ${PORT}`)
});

