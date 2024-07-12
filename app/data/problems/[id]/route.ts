// SPECIFIC PROBLEMS API ROUTE //
// API route for fetching and interacting with a specific problem (surface level data only)
import { IProblem } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Specified Problem ID
    const problemId: number = Number(params.id);

    // Get specific problems from database based on id in 
    let problems = await PRISMA.problem.findUnique({
        where: {
            id: problemId
        }
    });

    return NextResponse.json(problems);
}