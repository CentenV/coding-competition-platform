// PROBLEMS CRUD TEST //
import axios from "axios";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("Problems", () => {
    // errorless, successful api tests
    describe("basic", () => {
        const CURRENT_TIME = Date.now();
        const NEW_PROBLEM = {
            name: `Test Problem ${CURRENT_TIME}`,
            description: `Description of Test Problem ${CURRENT_TIME}`,
            points: 100
        };

        let problemId: undefined | number = undefined;
        test("create", async () => {
            const createNewProblem = await axios.post("http://localhost:3000/data/admin/problems", NEW_PROBLEM);
            expect(createNewProblem.data).toMatchObject({ id: expect.any(Number) });
            problemId = createNewProblem.data.id;
            const fetchNewProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(fetchNewProblem.data).toMatchObject({ id: problemId, ...NEW_PROBLEM })
        });
        test("update", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_PROBLEM = {
                name: `Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                description: `Description of Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                points: 101
            }
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const getUpdatedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(getUpdatedProblem.data).toMatchObject({ id: problemId, ...UPDATED_PROBLEM });
        });
        test("delete", async () => {
            expect(problemId).toBeDefined();
            const deleteProblem = await axios.delete(`http://localhost:3000/data/admin/problems/${problemId}`);
            const getDeletedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`, { validateStatus: () => true });
            expect(getDeletedProblem.status).toBe(404);
            expect(getDeletedProblem.data).toMatchObject({ message: `Failed to fetch problems id=${problemId}` })
        });
    });

    // flawed, maybe errorful or failing api tests
    describe("create - malformed payload", () => {
        const CURRENT_TIME = Date.now();
        async function noProblemCreated(newExecCaseData: Object) {
            const initialListOfAllProblems = await axios.get("http://localhost:3000/data/problems");
            const createNewProblem = await axios.post("http://localhost:3000/data/admin/problems", newExecCaseData, { validateStatus: () => true });
            expect(createNewProblem.status).toBe(500);
            expect(createNewProblem.data).toHaveProperty("message", "Failed to create new problem");
            const postPostListOfAllProblems = await axios.get(`http://localhost:3000/data/problems`);
            expect(postPostListOfAllProblems.data).toMatchObject(initialListOfAllProblems.data);
        }

        test("missing prop 1", async () => {
            const NEW_PROBLEM = {
                name: `Test Problem ${CURRENT_TIME}`,
            };
            await noProblemCreated(NEW_PROBLEM);
        });
        test("missing prop 2", async () => {
            const NEW_PROBLEM = {
                description: `Description of Test Problem ${CURRENT_TIME}`,
            };
            await noProblemCreated(NEW_PROBLEM);
        });
        test("missing prop 3", async () => {
            const NEW_PROBLEM = {
                points: 100,
            };
            await noProblemCreated(NEW_PROBLEM);
        });
        test("missing necessary props", async () => {
            const NEW_PROBLEM = {
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            await noProblemCreated(NEW_PROBLEM);
        });
        test("extra data", async () => {
            let execCaseId: undefined | number = undefined;
            const NEW_PROBLEM = {
                name: `Test Problem ${CURRENT_TIME}`,
                description: `Description of Test Problem ${CURRENT_TIME}`,
                points: 100,
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const createNewProblem = await axios.post("http://localhost:3000/data/admin/problems", NEW_PROBLEM);
            execCaseId = createNewProblem.data.id;
            expect(createNewProblem.data).toMatchObject({ id: expect.any(Number) });
            const cleanUpCreatedProblem = await axios.delete(`http://localhost:3000/data/admin/problems/${execCaseId}`);
        });
    });

    describe("update - malformed payload", () => {
        const CURRENT_TIME = Date.now();
        const NEW_PROBLEM = {
            name: `Test Problem ${CURRENT_TIME}`,
            description: `Description of Test Problem ${CURRENT_TIME}`,
            points: 100
        };
        let problemId: undefined | number = undefined;
        // Spin up proper entries
        beforeEach(async () => {
            const createProblem = await axios.post("http://localhost:3000/data/admin/problems", NEW_PROBLEM);
            problemId = createProblem.data.id;
        });
        // Delete proper entries
        afterEach(async () => {
            const deleteNewProblem = await axios.delete(`http://localhost:3000/data/admin/problems/${problemId}`);
            problemId = undefined;
        });

        test("missing prop 1", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_PROBLEM = {
                name: `Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`
            };
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const getUpdatedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(getUpdatedProblem.data).toMatchObject({ id: problemId, name: UPDATED_PROBLEM.name, description: NEW_PROBLEM.description, points: NEW_PROBLEM.points });
        });
        test("missing prop 2", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_PROBLEM = {
                description: `Description of Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`,
            };
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const getUpdatedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(getUpdatedProblem.data).toMatchObject({ id: problemId, name: NEW_PROBLEM.name, description: UPDATED_PROBLEM.description, points: NEW_PROBLEM.points });
        });
        test("missing prop 3", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_PROBLEM = {
                points: Math.floor(UPDATE_TIME / 1000000),
            };
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const getUpdatedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(getUpdatedProblem.data).toMatchObject({ id: problemId, name: NEW_PROBLEM.name, description: NEW_PROBLEM.description, points: UPDATED_PROBLEM.points });
        });
        test("missing necessary props", async () => {
            const UPDATED_PROBLEM = {
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const initialProblemList = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const postPatchProblemList = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(postPatchProblemList.data).toMatchObject(initialProblemList.data);
        });
        test("extra data", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_PROBLEM = {
                name: `Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                description: `Description of Test Problem ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                points: Math.floor(UPDATE_TIME / 1000000),
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const updateProblem = await axios.patch(`http://localhost:3000/data/admin/problems/${problemId}`, UPDATED_PROBLEM);
            const getUpdatedProblem = await axios.get(`http://localhost:3000/data/problems/${problemId}`);
            expect(getUpdatedProblem.data).toMatchObject({ id: problemId, name: UPDATED_PROBLEM.name, description: UPDATED_PROBLEM.description, points: UPDATED_PROBLEM.points })
        });
    });

    test("delete - no problem exists", async () => {
        const initialProblemList = await axios.get(`http://localhost:3000/data/problems`);
        const deleteProblem = await axios.delete(`http://localhost:3000/data/admin/problems/-1`, { validateStatus: () => true });
        expect(deleteProblem.status).toBe(500);
        const postPatchProblemList = await axios.get(`http://localhost:3000/data/problems`);
        expect(postPatchProblemList.data).toMatchObject(initialProblemList.data);
    });
});