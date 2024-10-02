// PROBLEM ADMIN API ROUTE //
// ADMIN ONLY API Route used for the modification of problems
import { IProblem } from "@/app/types";
import { convertToId } from "../../validation";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const PRISMA: PrismaClient = new PrismaClient();
const router = Router();

/**
 * Creates a new problem
 * 
 * @returns The newly create problem's id
 */
router.post("/", async (req, res) => {
    try {
        // Get POST request body
        let newProblem: IProblem = await req.body;
        // Push to database
        const problem = await PRISMA.problem.create({
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points,
            }
        });
        res.status(200).send({ id: problem.id });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to create new problem", error: err });
    }
});

/**
 * Updates the problem data
 * 
 * @returns Nothing
 */
router.patch("/:problemId", async (req, res) => {
    const PARAMS_PROBLEM_ID = req.params.problemId;
    try {
        // Specified Problem ID
        const problemId = convertToId(PARAMS_PROBLEM_ID);
        // Get PATCH request body
        let newProblem: IProblem = await req.body;
        // Push to database
        const updateProblem = await PRISMA.problem.update({
            where: {
                id: problemId
            },
            data: {
                name: newProblem.name,
                description: newProblem.description,
                points: newProblem.points,
            }
        });
        res.status(200).send({});
    }
    catch (err) {
        res.status(500).send({ message: `Failed to update problem id=${PARAMS_PROBLEM_ID}`, error: err });
    }
});

/**
 * Deletes the specified problem
 * 
 * @returns Nothing
 */
router.delete("/:problemId", async (req, res) => {
    const PARAMS_PROBLEM_ID = req.params.problemId;
    try {
        // Specified Problem ID
        const problemId = convertToId(PARAMS_PROBLEM_ID);
        // Delete in database
        const deleteProblem = await PRISMA.problem.delete({
            where: {
                id: problemId
            }
        });
        res.status(200).send({});
    }
    catch (err) {
        res.status(500).send({ message: `Failed to delete problem id=${PARAMS_PROBLEM_ID}`, error: err });
    }
});


export default router;