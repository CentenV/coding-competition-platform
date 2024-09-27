// CODING COMPETITION PLATFORM APPLICATION SERVER //
// Express.js server for serving the Next.js application with an Express powered backend
import { createServer } from "http";
import { parse } from "url";
import next from "next";

// Application port
const PORT: number = parseInt(process.env.PORT || "3000", 10)
// Development mode
const DEV = process.env.NODE_ENV !== 'production';

// Connecting Express and Next
const app = next({ dev: DEV });
const handle = app.getRequestHandler();

// Initialization
// https://nextjs.org/docs/app/building-your-application/configuring/custom-server 
app.prepare().then(() => {
    createServer((req, res) => {
        const parsedURL = parse(req.url!, true);
        handle(req, res, parsedURL);
    }).listen(PORT);

    console.log(`> Coding Competition Platform Server - Listening at http://localhost:${PORT} as ${DEV ? 'development' : process.env.NODE_ENV}`);
});
