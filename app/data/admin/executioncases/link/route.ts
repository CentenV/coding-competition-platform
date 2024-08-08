// PROBLEM EXECUTION LINK API ROUTE //
// ADMIN ONLY API route for retrieving and modifying specific execution case links

import { convertToId } from "@/app/data/validation";
import { IProblemExecutionCase } from "@/app/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

/**
 * Retrieves all the execution case links of a specific problem
 * 
 * @returns All the problem execution case links
 */
export async function GET(request: NextRequest) {
    const QUERY_PARAMS = request.nextUrl.searchParams;

    // Converting parameters
    let PROBLEM_ID = QUERY_PARAMS.get("problemId");
    const ONLY_RUN_CASE = QUERY_PARAMS.get("onlyrun");
    const ONLY_ASSESS_CASE = QUERY_PARAMS.get("onlyassess");

    try {
        // Filters
        let queryObj: Prisma.problem_execution_case_xrefWhereInput = {
            problem_id: undefined,
            reltype: "RUN",
            AND: {
                reltype: "ASSESS"
            }
        };
        // Specific problem specified (id)
        if (PROBLEM_ID != null) {
            // Convert URI id
            queryObj.problem_id = convertToId(PROBLEM_ID);
        }
        // Run case or assess case exclusion filter provided (default run and assess displayed)
        if (ONLY_RUN_CASE != null && ONLY_ASSESS_CASE != null) {
            return NextResponse.json({ message: "Invalid filters provided in the query parameters" }, { status: 400 });
        }
        else if (ONLY_RUN_CASE != null) {
            console.log("ran");
            delete queryObj.AND;
        }
        else if (ONLY_ASSESS_CASE != null) {
            delete queryObj.reltype;
        }
        // Fetch all run cases from database
        const problemExecutionCases = await PRISMA.problem_execution_case_xref.findMany({
            where: queryObj
        });
        return NextResponse.json(problemExecutionCases, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: `Failed to fetch problem execution case link(s), {problemId: ${PROBLEM_ID}, only_run_case: ${ONLY_RUN_CASE}, only_assess_case: ${ONLY_ASSESS_CASE}}` }, { status: 400 });
    }
}

/**
 * Creates a new problem execution case link (xref)
 * 
 * @returns The id of the new problem execution case xref entry, { id: number }
 */
export async function POST(request: NextRequest) {
    try {
        // Get POST request body
        const newProblemExecutionCase = await request.json() as Omit<IProblemExecutionCase, "id">;
        // Create new problem execution case xref link in the database
        const problemExecutionCase = await PRISMA.problem_execution_case_xref.create({
            data: {
                problem_id: newProblemExecutionCase.problem_id,
                execution_case_id: newProblemExecutionCase.execution_case_id,
                reltype: newProblemExecutionCase.reltype,
                hidden: newProblemExecutionCase.hidden,
            }
        });
        return NextResponse.json({ id: problemExecutionCase.id }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to create problem execution case" }, { status: 400 });
    }
}