// SPECIFIC PROBLEMS API ROUTE //
// API route for interacting with a specific problem
import { IProblem } from "@/app/_components/interfaces";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

export async function GET({ params }: { params: { id: string } }) {
    // Specific Problem ID
    const problemId: number = Number(params.id);

    // Get specific problems from database based on id in 
    let problems = await PRISMA.problem.findUnique({
        where: {
            id: problemId
        }
    });

    return NextResponse.json(problems);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    // Specific Problem ID
    const problemId: number = Number(params.id);

    // Get PATCH request body
    let newProblemData: IProblem = await request.json();

    // Push to database
    const updateProblem = await PRISMA.problem.update({
        where: {
            id: problemId
        },
        data: {
            name: newProblemData.name,
            description: newProblemData.description,
            points: newProblemData.points
        }
    });

    return NextResponse.json({});
}