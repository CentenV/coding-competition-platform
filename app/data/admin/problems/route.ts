// GENERAL PROBLEM API ROUTE //
// ADMIN ONLY API Route used for the creation of problems
import { IProblem } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

// Create new problem
export async function POST(request: Request) {
    try {
        // Get POST request body
        let newProblem: IProblem = await request.json();
        // Push to database
        const problem = await PRISMA.problem.create({
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points,
            }
        });
        return NextResponse.json({ id: problem.id });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to create new problem", error: err }, { status: 500 });
    }
}