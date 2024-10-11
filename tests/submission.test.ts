/**
 * Verifying whether the submission API returns the submission entry in database
 */
import { IProblem } from "@/app/types";
import axios from "axios";
import { test } from "vitest";

test("User submission", async () => {
    let problemId: number = -1;

    // Create temp problem
    const problem: IProblem = {
        name: "Unit Test, submission test",
        description: "No description provided",
        points: 10
    }
    const createProblem = await axios.post("/data/admin/problems", problem);
    problemId = createProblem.data.id;

    // Submission

    // Delete temp problem
    const deleteProblem = await axios.delete(`/data/admin/problems/${problemId}`);
});