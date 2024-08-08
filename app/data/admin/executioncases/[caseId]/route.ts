// SPECIFIC EXECUTION CASE API ROUTE //
// ADMIN ONLY route that is dedicated to updating and deletion of a specific execution case
import { convertToId, IdConversionError } from "@/app/data/validation";
import { IExecutionCase } from "@/app/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const PRISMA = new PrismaClient();

/**
 * Retrieves all the details of the specific execution case
 * 
 * @returns Details of the execution case
 */
export async function GET(request: Request, { params }: { params: { caseId: string } }) {
    let EXEC_CASE_ID: number | null = null;

    try {
        // Convert URI id
        EXEC_CASE_ID = convertToId(params.caseId)
        // Polling database - NotFoundError thrown if no entry exists
        const specificExecutionCase = await PRISMA.execution_case.findUniqueOrThrow({
            where: {
                id: EXEC_CASE_ID
            }
        });
        return NextResponse.json(specificExecutionCase, { status: 200 });
    }
    catch (err) {
        // Prisma find unique returned error
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            return NextResponse.json({ message: "No execution case entry was found for id=" + EXEC_CASE_ID }, { status: 404 });
        }
        return NextResponse.json({ message: "Failed to fetch execution case id=" + EXEC_CASE_ID }, { status: 400 });
    }
}

/**
 * Updates the data of an execution case
 * 
 * @returns No JSON, status only
 */
export async function PATCH(request: Request, { params }: { params: { caseId: string } }) {
    let EXEC_CASE_ID: number | null = null;

    try {
        // Convert URI id
        EXEC_CASE_ID = convertToId(params.caseId)
        // Get POST request body
        const newExecutionCaseData = await request.json() as IExecutionCase;
        // Apply to database
        const updateExecutionCase = await PRISMA.execution_case.update({
            where: {
                id: EXEC_CASE_ID
            },
            data: {
                input: newExecutionCaseData.input,
                output: newExecutionCaseData.output,
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to update execution case id=" + EXEC_CASE_ID }, { status: 400 });
    }
}

/**
 * Deletes the execution case
 * 
 * @returns No JSON, status only
 */
export async function DELETE(request: Request, { params }: { params: { caseId: string } }) {
    let EXEC_CASE_ID: number | null = null;

    try { 
        // Convert URI id
        EXEC_CASE_ID = convertToId(params.caseId);
        // Delete in database
        const deleteExecutionCase = await PRISMA.execution_case.delete({
            where: {
                id: EXEC_CASE_ID
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to delete execution case id=" + EXEC_CASE_ID }, { status: 400 });
    }
}