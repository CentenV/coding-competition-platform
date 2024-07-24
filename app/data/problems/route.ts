// ALL PROBLEMS API ROUTE //
// API route for fetching all problems
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