// INVIDIVIDUAL PROBLEM CODE SUBMISSION API ROUTE //
// API route for running/submitting code for a specific problem and user associated with the submission
import { NextResponse } from "next/server";
import { Execute, PythonExecute } from "../execute";
import { PrismaClient } from "@prisma/client";
import { CodeCaseSubmissionType, IProblemSubmissionResponse } from "@/app/types";

const PRISMA: PrismaClient = new PrismaClient();

export async function POST(request: Request, { params }: { params: {id: string} }) {
    // Specified Problem ID
    const PROBLEM_ID: number = Number(params.id);

    // Request Body
    const requestBody = await request.json();

    // Run code in docker
    const language = requestBody.language;  // TODO: individual language
    const code: string = requestBody.code;

    // Fetch all the run/test cases for the current problem/submission
    const runCases = await PRISMA.problem_run_case.findMany({
        where: {
            problem_id: PROBLEM_ID
        }
    });

    // Execute code and get output
    // TODO: individual language
    const codeExecution: Execute = new PythonExecute("test", code);
    const codeOutput: string = codeExecution.run();

    // Assembling data and returning it back to user
    let responsePayload: IProblemSubmissionResponse[] = [];
    runCases.map((currentCase) => {     // run cases
        responsePayload.push({
            pass: true,
            expected: null,
            actual: codeOutput,
            hidden: currentCase.hidden,
            type: CodeCaseSubmissionType.RUN,
        })
    });

    return NextResponse.json(responsePayload);
}