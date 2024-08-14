// SANDBOX CODE SUBMISSION API ROUTE //
// API route for submitting code the execution - no run cases or tests are ran on I/O
import { NextResponse } from "next/server";
import { Execute, Language, PythonExecute } from "../execute";
import { ISandboxSubmissionRequest, ISandboxSubmissionResponse, SubmissionLanguage } from "@/app/types";

export async function POST(request: Request) {
    // Request Body
    const requestBody: ISandboxSubmissionRequest = await request.json() as ISandboxSubmissionRequest;

    // Run code in Docker
    console.log(requestBody.language);
    const language: SubmissionLanguage = requestBody.language;  // TODO: individual language
    const code: string = requestBody.code;

    // Execute code and get output
    // TODO: individual language
    const codeExecution: Execute = new PythonExecute("test", code);
    const codeOutput: string = codeExecution.run();

    const responsePayload: ISandboxSubmissionResponse = { output: codeOutput };

    return NextResponse.json(responsePayload);
}