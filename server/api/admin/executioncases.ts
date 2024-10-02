// EXECUTION CASE ADMIN API ROUTE //
// ADMIN ONLY API Route used for the modification of execution cases
import { IExecutionCase } from "@/app/types";
import { convertToId } from "../../validation";
import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";

const PRISMA: PrismaClient = new PrismaClient();
const router = Router();

/**
 * Fetches all of execution cases
 * ?problem: Filters the execution cases given a specific problem
 * 
 * @returns JSON of all of the execution cases given none/any query parameters
 */
router.get("/", async (req, res) => {
    // Converting parameters
    // const PROBLEM_ID = req.query.problemId;
    const PROBLEM_ID = undefined;

    // Specified problem
    if (PROBLEM_ID != undefined) {
        try {
            const PID: number = parseInt(PROBLEM_ID as string);
            // Fetch all execution cases for specific problem
            const problemExecutionCases = await PRISMA.execution_case.findMany({
                where: {
                    problem_execution_case_xref: {
                        every: {
                            problem_id: PID
                        }
                    }
                }
            });
            console.log();
            res.status(200).json(problemExecutionCases);
        }
        catch (err) {
            res.status(404).json({ message: "Failed to fetch execution case(s) belonging to problem id=" + PROBLEM_ID, error: err });
        }
    }
    // No problem specified
    else {
        try {
            // Fetch all execution cases
            const executionCases = await PRISMA.execution_case.findMany({
                orderBy: {
                    id: "asc"
                }
            });
            res.status(200).json(executionCases);
        }
        catch (err) {
            res.status(500).json({ message: "Failed to fetch all execution cases", error: err });
        }
    }
});

/**
 * Creates a new execution case
 * 
 * @returns Case ID of the new execution case { id: number }
 */
router.post("/", async (req, res) => {
    try {
        // Get POST request body
        const newExecutionCase = await req.body as Omit<IExecutionCase, "id">;
        // Push new execution case to the database
        const execCase = await PRISMA.execution_case.create({
            data: {
                input: newExecutionCase.input,
                output: newExecutionCase.output,
            }
        });
        res.status(200).json({ id: execCase.id });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create execution case", error: err });
    }
});

/**
 * Retrieves all the details of the specific execution case
 * 
 * @returns JSON of the specified execution case
 */
router.get("/:caseId", async (req, res) => {
    let EXEC_CASE_ID: number | null = null;
    try {
        // Convert execution case id from the URI 
        EXEC_CASE_ID = convertToId(req.params.caseId);
        // Polling database - NotFoundError thrown if no entry exists
        const specificExecutionCase = await PRISMA.execution_case.findUniqueOrThrow({
            where: {
                id: EXEC_CASE_ID
            }
        });
        res.status(200).json(specificExecutionCase);
    }
    catch (err) {
        // Prisma find unique returned error
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            res.status(404).json({ message: "No execution case entry was found for id=" + EXEC_CASE_ID });
        }
        else
        {
            res.status(500).send({ message: "Failed to fetch execution case id=" + EXEC_CASE_ID });
        }
        res.end();
    }
});

/**
 * Updates the data of an execution case
 * 
 * @returns Nothing
 */
router.patch("/:caseId", async (req, res) => {
    let EXEC_CASE_ID: number | null = null;
    try {
        // Convert URI id
        EXEC_CASE_ID = convertToId(req.params.caseId)
        // Get POST request body
        const newExecutionCaseData = await req.body as IExecutionCase;
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
        res.status(200).json({});
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update execution case id=" + EXEC_CASE_ID });
    }
});

/**
 * Deletes the execution case
 * 
 * @returns Nothing
 */
router.delete("/:caseId", async (req, res) => {
    let EXEC_CASE_ID: number | null = null;

    try {
        // Convert URI id
        EXEC_CASE_ID = convertToId(req.params.caseId);
        // Delete in database
        const deleteExecutionCase = await PRISMA.execution_case.delete({
            where: {
                id: EXEC_CASE_ID
            }
        });
        res.status(200).json({});
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete execution case id=" + EXEC_CASE_ID });
    }
});

export default router;