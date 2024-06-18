// ALL PROBLEMS API ROUTE //
// API route for fetching all problems
import { IProblem } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

// Get all problems
export async function GET() {
    // Get all problems from database
    let problems = await PRISMA.problem.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(problems);
}

// Create new problem
export async function POST(request: Request) {
    // Get POST request body
    let newProblem: IProblem = await request.json();

    // Push to database
    const problem = await PRISMA.problem.create(
        {
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points,
                expected_output: newProblem.expected_output
            }
        }
    );

    return NextResponse.json({});
}