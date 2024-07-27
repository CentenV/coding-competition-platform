// PROBLEM RUN CASE API ROUTE //
// ADMIN ONLY route that is dedicated to CRUD of run cases for a specific problem
import { IProblemRunCase } from "@/app/types";
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

    // Get POST request body
    const newRunCase: Omit<IProblemRunCase, "problem_id"> = await request.json() as Omit<IProblemRunCase, "problem_id">;

    // Push new run case to the database
    const runCase = await PRISMA.problem_run_case.create({
        data: {
            problem_id: PROBLEM_ID,
            input: newRunCase.input,
            output: newRunCase.output,
            hidden: newRunCase.hidden,
        }
    }); 

    return NextResponse.json({ new_run_case_id: runCase.id });
}