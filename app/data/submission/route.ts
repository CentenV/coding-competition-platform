// PROBLEM SUBMISSION API ROUTE //
// API route for 
import { NextResponse } from "next/server";
import { Execute, Language, PythonExecute } from "./execute";
import { ISubmissionResponse } from "@/app/_components/interfaces";

export async function POST(request: Request) {
    // Request Body
    const requestBody = await request.json();

    // Run code in Docker
    const language = requestBody.language;
    const code: string = requestBody.code;

    // Execute code and get output
    const codeExecution: Execute = new PythonExecute("test", code);
    const codeOutput: string = codeExecution.run();

    const responsePayload: ISubmissionResponse = { output: codeOutput };

    return NextResponse.json(responsePayload);
}