// PROBLEMS API ROUTE //
// USER API route for fetching all or one specific problem (surface level data only)
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { convertToId } from "../../validation";

const PRISMA: PrismaClient = new PrismaClient();
const router = Router();

/**
 * Retrieves the all problems as a JSON array
 * 
 * @returns JSON array with all the problems
 */
router.get("/", async (req, res) => {
    try {
        // Get all problems from database
        const problems = await PRISMA.problem.findMany({
            orderBy: {
                id: "asc"
            }
        });
        res.status(200).send(problems);
    }
    catch (err) {
        res.status(404).send({ message: "Failed to fetch problems(s)", error: err });
    }
});

/**
 * Retrieves specific problem
 * 
 * @returns Specific problem and its data
 */
router.get("/:problemId", async (req, res) => {
    const PARAMS_PROBLEM_ID = req.params.problemId;
    try {
        // Converting problem id from URI
        const PROBLEM_ID = convertToId(PARAMS_PROBLEM_ID);
        // Get specific problems from database based on id
        const problems = await PRISMA.problem.findUniqueOrThrow({
            where: {
                id: PROBLEM_ID
            }
        });
        res.status(200).send(problems);
    }
    catch (err) {
        res.status(404).send({ message: `Failed to fetch problems id=${PARAMS_PROBLEM_ID}`, error: err });
    }
});


export default router;