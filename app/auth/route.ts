// AUTHENTICATION API ROUTE //
// API route for verifying and generating user tokens for authentication
import { ILogin } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { addSession, printSessionStore } from "./session_store";
import { createHash } from "crypto";

const PRISMA = new PrismaClient();

export async function POST(request: Request) {
    // console.log(request);
    // Responses thrown throughout the checking cycle to stop execution
    try {
        // Credentials entered by user
        const submittedUserCred: ILogin = await request.json().catch((error) => { throw Response.json({}, { status: 400 }) }) as ILogin;

        console.log("auth requested" + JSON.stringify(submittedUserCred));

        // Check that credentials exist
        const credential = await PRISMA.competitor.findUniqueOrThrow({
            where: {
                username: submittedUserCred.id,
                passphrase: submittedUserCred.password,
            },
        }).catch((error) => { throw Response.json({}, { status: 401 }) });

        // Reconcilate session id
        // checking if session exists
        let initialResponseTime = Math.floor(Date.now() / 1000);
        let generatedSessionId = createHash("sha256").update(`${submittedUserCred.id}+${initialResponseTime}`).digest("hex");
        addSession({ userId: submittedUserCred.id, sessionId: generatedSessionId, lastResponse: initialResponseTime });
        printSessionStore();
        return Response.json({}, { status: 200, headers: { "Set-Cookie": `session_id=${generatedSessionId}` } });
    }
    catch (response) {
        console.log(response);
        return response;
    }
}


