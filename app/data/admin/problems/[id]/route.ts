// SPECIFIC PROBLEMS ADMIN API ROUTE //
// ADMIN ONLY API route for fetching and interacting with a specific problem (full data)
import { IProblem } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

// Update trivial problem data
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    // Specified Problem ID
    const problemId: number = Number(params.id);

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

    return NextResponse.json({});
}

// Delete problem
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // Specified Problem ID
    const problemId: number = Number(params.id);

    // Delete in database
    const deleteProblem = await PRISMA.problem.delete({
        where: {
            id: problemId
        }
    });

    return NextResponse.json({});
}