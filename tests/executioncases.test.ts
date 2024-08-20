// EXECUTION CASES CRUD TEST //
import axios from 'axios';
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe("Execution Cases", () => {
    // basic/best case, errorless, successful api tests
    describe("basic", () => {
        const CURRENT_TIME = Date.now();
        const NEW_EXECUTION_CASE = {
            input: `Test Case Input: ${CURRENT_TIME}`,
            output: `Test Case Output: ${CURRENT_TIME}`,
        };
    
        let execCaseId: undefined | number = undefined;
        test("create", async () => {
            const createNewExecCase = await axios.post("http://localhost:3000/data/admin/executioncases", NEW_EXECUTION_CASE);
            expect(createNewExecCase.data).toMatchObject({ id: expect.any(Number) });
            execCaseId = createNewExecCase.data.id;
            const fetchNewExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(fetchNewExecCase.data).toMatchObject({ id: execCaseId, ...NEW_EXECUTION_CASE })
        });
        test("update", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_EXECUTION_CASE = {
                input: `Test Case Input: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                output: `Test Case Output: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
            }
            const updateExecCase = await axios.patch(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, UPDATED_EXECUTION_CASE)
            const getUpdatedExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(getUpdatedExecCase.data).toMatchObject({ id: execCaseId, ...UPDATED_EXECUTION_CASE });
        });
        test("delete", async () => {
            expect(execCaseId).toBeDefined();
            const deleteExecCase = await axios.delete(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            const getDeletedExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, { validateStatus: () => true });
            expect(getDeletedExecCase.status).toBe(404);
            expect(getDeletedExecCase.data).toMatchObject({ message: `No execution case entry was found for id=${execCaseId}` })
        });
    });

    // flawed, maybe errorful or failing api tests
    describe("create - malformed payload", () => {
        const CURRENT_TIME = Date.now();
        async function noExecCaseCreated(newExecCaseData: Object) {
            const initialListOfAllExecCases = await axios.get("http://localhost:3000/data/admin/executioncases");
            const createNewExecCase = await axios.post("http://localhost:3000/data/admin/executioncases", newExecCaseData, { validateStatus: () => true });
            expect(createNewExecCase.status).toBe(500);
            expect(createNewExecCase.data).toHaveProperty("message", "Failed to create execution case");
            const postPostListOfAllExecCases = await axios.get(`http://localhost:3000/data/admin/executioncases`);
            expect(postPostListOfAllExecCases.data).toMatchObject(initialListOfAllExecCases.data);
        }

        test("missing prop 1", async () => {
            const NEW_EXECUTION_CASE = {
                input: `Test Case Input: ${CURRENT_TIME}`,
            };
            await noExecCaseCreated(NEW_EXECUTION_CASE);
        });
        test("missing prop 2", async () => {
            const NEW_EXECUTION_CASE = {
                output: `Test Case Output: ${CURRENT_TIME}`,
            };
            await noExecCaseCreated(NEW_EXECUTION_CASE);
        });
        test("missing necessary props", async () => {
            const NEW_EXECUTION_CASE = {
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            await noExecCaseCreated(NEW_EXECUTION_CASE);
        });
        test("extra data", async () => {
            let execCaseId: undefined | number = undefined;
            const NEW_EXECUTION_CASE = {
                input: `Test Case Input: ${CURRENT_TIME}`,
                output: `Test Case Output: ${CURRENT_TIME}`,
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const createNewExecCase = await axios.post("http://localhost:3000/data/admin/executioncases", NEW_EXECUTION_CASE);
            execCaseId = createNewExecCase.data.id;
            expect(createNewExecCase.data).toMatchObject({ id: expect.any(Number) });
            const cleanUpCreatedExecCase = await axios.delete(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
        });
    });

    describe("update - malformed payload", () => {
        const CURRENT_TIME = Date.now();
        const NEW_EXECUTION_CASE = {
            input: `Test Case Input: ${CURRENT_TIME}`,
            output: `Test Case Output: ${CURRENT_TIME}`,
        };
        let execCaseId: undefined | number = undefined;
        // Spin up proper entries
        beforeEach(async () => {
            const createNewExecCase = await axios.post("http://localhost:3000/data/admin/executioncases", NEW_EXECUTION_CASE);
            execCaseId = createNewExecCase.data.id;
        });
        // Delete proper entries
        afterEach(async () => {
            const deleteNewExecCase = await axios.delete(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            execCaseId = undefined;
        });

        test("missing prop 1", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_EXECUTION_CASE = {
                input: `Test Case Input: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
            };
            const updateNewExecCase = await axios.patch(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, UPDATED_EXECUTION_CASE);
            const getUpdatedExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(getUpdatedExecCase.data).toMatchObject({ id: execCaseId, input: UPDATED_EXECUTION_CASE.input, output: NEW_EXECUTION_CASE.output })
        });
        test("missing prop 2", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_EXECUTION_CASE = {
                output: `Test Case Output: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
            };
            const updateNewExecCase = await axios.patch(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, UPDATED_EXECUTION_CASE);
            const getUpdatedExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(getUpdatedExecCase.data).toMatchObject({ id: execCaseId, input: NEW_EXECUTION_CASE.input, output: UPDATED_EXECUTION_CASE.output });
        });
        test("missing necessary props", async () => {
            const UPDATED_EXECUTION_CASE = {
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const initialExecCaseData = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            const updateExecCase = await axios.patch(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, UPDATED_EXECUTION_CASE);
            const postPatchExecCaseData = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(postPatchExecCaseData.data).toMatchObject(initialExecCaseData.data);
        });
        test("extra data", async () => {
            const UPDATE_TIME = Date.now();
            const UPDATED_EXECUTION_CASE = {
                input: `Test Case Input: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                output: `Test Case Output: ${CURRENT_TIME} updated_${UPDATE_TIME}`,
                extra_prop: "HELLO WORLD THIS IS WRITTEN ON 8/10/2024",
                problem_count: 10
            };
            const updateNewExecCase = await axios.patch(`http://localhost:3000/data/admin/executioncases/${execCaseId}`, UPDATED_EXECUTION_CASE);
            const getUpdatedExecCase = await axios.get(`http://localhost:3000/data/admin/executioncases/${execCaseId}`);
            expect(getUpdatedExecCase.data).toMatchObject({ id: execCaseId, input: UPDATED_EXECUTION_CASE.input, output: UPDATED_EXECUTION_CASE.output })
        });
    });

    test("delete - no execution case exists", async () => {
        const initialExecCaseData = await axios.get(`http://localhost:3000/data/admin/executioncases`);
        const deleteExecCase = await axios.delete(`http://localhost:3000/data/admin/executioncases/-1`, { validateStatus: () => true });
        expect(deleteExecCase.status).toBe(500);
        const postPatchExecCaseData = await axios.get(`http://localhost:3000/data/admin/executioncases`);
        expect(postPatchExecCaseData.data).toMatchObject(initialExecCaseData.data);
    });
});