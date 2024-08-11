// SPECIFIC PROBLEMS ADMIN API ROUTE //
// ADMIN ONLY API route for fetching and interacting with a specific problem (full data)
import { convertToId } from "@/app/data/validation";
import { IProblem } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

// Update problem data
export async function PATCH(request: Request, { params }: { params: { problemId: string } }) {
    const PARAMS_PROBLEM_ID = params.problemId;
    try {
        // Specified Problem ID
        const problemId = convertToId(PARAMS_PROBLEM_ID);
        // Get PATCH request body
        let newProblem: IProblem = await request.json();
        // Push to database
        const updateProblem = await PRISMA.problem.update({
            where: {
                id: problemId
            },
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points,
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: `Failed to update problem id=${PARAMS_PROBLEM_ID}`, error: err }, { status: 500 });
    }
}

// Delete problem
export async function DELETE(request: Request, { params }: { params: { problemId: string } }) {
    const PARAMS_PROBLEM_ID = params.problemId;
    try {
        // Specified Problem ID
        const problemId = convertToId(PARAMS_PROBLEM_ID);
        // Delete in database
        const deleteProblem = await PRISMA.problem.delete({
            where: {
                id: problemId
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: `Failed to delete problem id=${PARAMS_PROBLEM_ID}`, error: err }, { status: 500 });
    }
}