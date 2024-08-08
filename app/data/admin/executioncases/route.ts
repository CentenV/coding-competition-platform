// EXECUTION CASES API ROUTE //
// ADMIN ONLY route that is dedicated to fetching and creation of execution cases
import { IExecutionCase } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

/**
 * Fetches all of execution cases
 * 
 * ?problem: Filters the execution cases given a specific problem
 * 
 * @returns Returns all of the execution cases given the query parameters
 */
export async function GET(request: NextRequest) {
    const QUERY_PARAMS = request.nextUrl.searchParams;

    // Converting parameters
    const PROBLEM_ID = QUERY_PARAMS.get("problem");

    // Specified problem
    if (PROBLEM_ID != null) {
        try {
            const PID: number = parseInt(PROBLEM_ID);
            // Fetch all execution cases for specific problem
            const problemExecutionCases = await PRISMA.execution_case.findMany({
                where: {
                    problem_execution_case_xref: {
                        every: {
                            problem_id: PID
                        }
                    }
                }
            });
            return NextResponse.json(problemExecutionCases);
        }
        catch (err) {
            return NextResponse.json({ message: "Failed to fetch execution case(s) belonging to problem id=" + PROBLEM_ID, error: err }, { status: 404 });
        }
    }

    // No problem specified
    try { 
        // Fetch all execution cases
        const executionCases = await PRISMA.execution_case.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(executionCases);
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to fetch all execution cases" }, { status: 400 });
    }
}

/**
 * Creates a new execution case
 * 
 * @returns Case ID of the new execution case { id: number }
 */
export async function POST(request: Request) {
    try {
        // Get POST request body
        const newExecutionCase = await request.json() as Omit<IExecutionCase, "id">;
        // Push new execution case to the database
        const execCase = await PRISMA.execution_case.create({
            data: {
                input: newExecutionCase.input,
                output: newExecutionCase.output,
            }
        });
        return NextResponse.json({ id: execCase.id });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to create execution case" }, { status: 400 });
    }
}