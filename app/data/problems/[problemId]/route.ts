// SPECIFIC PROBLEMS API ROUTE //
// API route for fetching and interacting with a specific problem (surface level data only)
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { convertToId } from "../../validation";

const PRISMA: PrismaClient = new PrismaClient();

/**
 * Get specific problem
 * 
 * @returns Object of the specified problem
 */
export async function GET(request: Request, { params }: { params: { problemId: string } }) {
    let PARAMS_PROBLEMID = params.problemId;
    try {
        // Converting Problem ID
        const PROBLEM_ID = convertToId(PARAMS_PROBLEMID);
        // Get specific problems from database based on id in 
        let problems = await PRISMA.problem.findUniqueOrThrow({
            where: {
                id: PROBLEM_ID
            }
        });
        return NextResponse.json(problems);
    }
    catch (err) {
        return NextResponse.json({ message: `Failed to fetch problems id=${PARAMS_PROBLEMID}`, error: err }, { status: 404 });
    }
}