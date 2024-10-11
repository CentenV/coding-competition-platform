// PROBLEM-EXECUTION CASE ADMIN API ROUTE //
// ADMIN ONLY API Route used for the creation, retrieval, and modification of the connection between problems and execution cases
import { IProblemExecutionCase } from "@/app/types";
import { convertToId } from "@/server/validation";
import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";

const PRISMA = new PrismaClient();

const router = Router();

/**
 * Retrieves all the execution case links of a specific problem
 * 
 * @returns All the problem execution case links
 */
router.get("/", async (req, res) => {
    // Converting parameters
    const PROBLEM_ID = req.query.problemId;
    const ONLY_RUN_CASE = req.query.onlyrun;
    const ONLY_ASSESS_CASE = req.query.onlyassess;

    try {
        // Filters
        const queryObj: Prisma.problem_execution_case_xrefWhereInput = {
            problem_id: undefined,
            reltype: "RUN",
            AND: {
                reltype: "ASSESS"
            }
        };
        // Specific problem specified (id)
        if (PROBLEM_ID != null) {
            // Convert URI id
            queryObj.problem_id = convertToId(PROBLEM_ID);
        }
        // Run case or assess case exclusion filter provided (default run and assess displayed)
        if (ONLY_RUN_CASE == null && ONLY_ASSESS_CASE == null) {
            delete queryObj.reltype;
            delete queryObj.AND;
        }
        else if (ONLY_RUN_CASE != null && ONLY_ASSESS_CASE != null) {
            return res.status(400).json({ message: "Invalid filters provided in the query parameters" });
        }
        else if (ONLY_RUN_CASE != null) {
            console.log("ran");
            delete queryObj.AND;
        }
        else if (ONLY_ASSESS_CASE != null) {
            delete queryObj.reltype;
        }
        // Fetch all run cases from database
        const problemExecutionCases = await PRISMA.problem_execution_case_xref.findMany({
            where: queryObj
        });
        res.status(200).json(problemExecutionCases);
    }
    catch (err) {
        res.status(500).json({ message: `Failed to fetch problem execution case link(s), {problemId: ${PROBLEM_ID}, only_run_case: ${ONLY_RUN_CASE}, only_assess_case: ${ONLY_ASSESS_CASE}}`, error: err });
    }
});

/**
 * Creates a new problem execution case link (xref)
 * 
 * @returns The id of the new problem execution case xref entry, { id: number }
 */
router.post("/", async (req, res) => {
    try {
        // Get POST request body
        const newProblemExecutionCase = await req.body as Omit<IProblemExecutionCase, "id">;
        // Create new problem execution case xref link in the database
        const problemExecutionCase = await PRISMA.problem_execution_case_xref.create({
            data: {
                problem_id: newProblemExecutionCase.problem_id,
                execution_case_id: newProblemExecutionCase.execution_case_id,
                reltype: newProblemExecutionCase.reltype,
                hidden: newProblemExecutionCase.hidden,
            }
        });
        res.status(200).json({ id: problemExecutionCase.id });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create problem execution case", error: err });
    }
});

/**
 * Updates the problem execution case link/xref metadata (ONLY MAKES CHANGES to columns: reltype, hidden)
 * 
 * @returns No JSON, status only
 */
router.patch("/:linkId", async (req, res) => {
    let LINK_ID: number | string = req.params.linkId;
    try {
        // Convert URI id
        LINK_ID = convertToId(LINK_ID);
        // Get POST request body
        const updatedProblemExecutionCase = await req.body as IProblemExecutionCase;
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
        res.status(200).json({});
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update problem execution case for problem id=" + LINK_ID, error: err });
    }
});

/**
 * Deletes the problem execution case link (xref)
 * 
 * @returns No JSON, status only
 */
router.delete("/:linkId", async (req, res) => {
    let LINK_ID: number | string = req.params.linkId;
    try {
        // Convert URI id
        LINK_ID = convertToId(LINK_ID);
        // Update problem execution case link (xref)
        const deleteProblemExecutionCaseLink = await PRISMA.problem_execution_case_xref.delete({
            where: {
                id: LINK_ID,
            }
        });
        res.status(200).json({});
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete problem execution case link/xref id=" + LINK_ID, error: err });
    }
});


export default router;