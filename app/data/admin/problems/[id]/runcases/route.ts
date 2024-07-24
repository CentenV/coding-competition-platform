// PROBLEM RUN CASE API ROUTE //
// ADMIN ONLY route that is dedicated to CRUD of run cases for a specific problem
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const PRISMA: PrismaClient = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Specified Problem ID
    const PROBLEM_ID: number = Number(params.id);

    // Fetch all run cases from the database
    const runCases = await PRISMA.problem_run_case.findMany({
        where: {
            problem_id: PROBLEM_ID
        }
    });

    return NextResponse.json(runCases);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    // Specified Problem ID
    const PROBLEM_ID: number = Number(params.id);

    

    // Add new 
}