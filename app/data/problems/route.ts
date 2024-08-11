// ALL PROBLEMS API ROUTE //
// API route for fetching all problems
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

/**
 * Get all problems
 * 
 * @returns Array of the objects of all problems
 */
export async function GET() {
    try {
        // Get all problems from database
        let problems = await PRISMA.problem.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(problems, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to fetch problems(s)", error: err }, { status: 404 });
    }
}