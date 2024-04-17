// Problme API Route //
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA: PrismaClient = new PrismaClient();

export async function GET(request: Request) {
    // Get all problems from database
    let problems = await PRISMA.problem.findMany();
    // return NextResponse.json(problems);
    return NextResponse.json({})
}

export async function POST(request: Request) {
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

    console.log("created");

    return NextResponse.json({});
}