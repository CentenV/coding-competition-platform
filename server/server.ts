// CODING COMPETITION PLATFORM APPLICATION SERVER //
// Express.js server for serving the Next.js application with an Express powered backend
// https://nextjs.org/docs/app/building-your-application/configuring/custom-server 
// https://www.dhiwise.com/post/the-developer-guide-to-nextjs-express-integration
// https://www.geeksforgeeks.org/next-js-custom-server/
import next from "next";
import express from "express";
import apiEndpoints from "./api/api";

// Application port
const PORT: number = parseInt(process.env.PORT || "3000", 10)
// Application Mode
const DEV = process.env.NODE_ENV !== 'production';

// Connecting Express and Next
const app = next({ dev: DEV });
const handle = app.getRequestHandler();
const server = express();


// Initialization
app.prepare().then(() => {
    server.listen(PORT, () => {
        console.log(`> Coding Competition Platform Server - Listening at http://localhost:${PORT} as ${DEV ? 'development' : process.env.NODE_ENV}`);
    });
});

// API Router
server.use(express.json());
server.use("/api", apiEndpoints);

// Remaining Nextjs routes
server.get('*', (req, res) => {
    return handle(req, res);
});
