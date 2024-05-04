// ALL PROBLEMS API ROUTE //
// API route for fetching all problems
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

// Get all problems
export async function GET(request: Request) {
    // Get all problems from database
    let problems = await PRISMA.problem.findMany();
    return NextResponse.json(problems);
}

// Create new problem
export async function POST(request: Request) {
    // Get POST request body
    let newProblem = await request.json();

    // Push to database
    const problem = await PRISMA.problem.create(
        {
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points
            }
        }
    );

    return NextResponse.json({});
}