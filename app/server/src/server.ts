// Coding Competition Platform - Rest API Server //
import { logger } from "@codecompplat/logger"
import express from "express"

// Application port
// const PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
const PORT = "3001";
// Application mode
// const DEV = process.env.NODE_ENV !== "production";

const server = express();

server.listen(PORT, () => {
    logger.info(`Started Coding-Competition-Platform Server - Listening on port ${PORT}`)
});

server.get("/", (_req, res) => {
    res.send("hello world");
});
