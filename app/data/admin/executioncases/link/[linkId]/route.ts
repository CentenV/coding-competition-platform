// SPECIFIC PROBLEM EXECUTION LINK API ROUTE //
// ADMIN ONLY API route for retrieving and modifying execution case links
import { convertToId } from "@/app/data/validation";
import { IProblemExecutionCase } from "@/app/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

/**
 * Updates the problem execution case link/xref metadata (ONLY MAKES CHANGES to columns: reltype, hidden)
 * 
 * @returns No JSON, status only
 */
export async function PATCH(request: Request, { params }: { params: { linkId: string } }) {
    let LINK_ID: number | null = null;
    try {
        // Convert URI id
        LINK_ID = convertToId(params.linkId);
        // Get POST request body
        const updatedProblemExecutionCase = await request.json() as IProblemExecutionCase;
        // Update problem execution case xref
        const problemExecutionCase = await PRISMA.problem_execution_case_xref.update({
            where: {
                id: LINK_ID,
            },
            data: {
                reltype: updatedProblemExecutionCase.reltype,
                hidden: updatedProblemExecutionCase.hidden,
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to update problem execution case for problem id=" + LINK_ID }, { status: 500 });
    }
}

/**
 * Deletes the problem execution case link (xref)
 * 
 * @returns No JSON, status only
 */
export async function DELETE(request: Request, { params }: { params: { linkId: string } }) {
    let LINK_ID: number | null = null;
    try {
        // Convert URI id
        LINK_ID = convertToId(params.linkId);
        // Update problem execution case link (xref)
        const deleteProblemExecutionCaseLink = await PRISMA.problem_execution_case_xref.delete({
            where: {
                id: LINK_ID,
            }
        });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Failed to delete problem execution case link/xref id=" + LINK_ID }, { status: 500 });
    }
}