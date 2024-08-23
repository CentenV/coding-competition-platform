import { getNamingTime } from "../app/data/submission/timenaming";
import { gradeProblemSubmission } from "../app/data/submission/grading";
import { ExecutionCaseType, IExecutionCase, IProblem, IProblemExecutionCase, ProblemGradingResult } from "../app/types";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Execute, PythonExecute } from "../app/data/submission/execute";
import axios from "axios";

// TODO
// inputs into program

describe("Grader function", () => {
    describe("python", () => {
        describe("hello world", () => {
            describe("1 run case, shown", () => {
                let problemId: number | null = null;
                let execCaseId: number | null = null;
                let problemExecCaseXrefId: number | null = null;
                beforeEach(async () => {
                    // Create temp problem
                    const problem: IProblem = {
                        name: "Unit Test, hello world, 1 run case problem, run case shown",
                        description: "No description provided",
                        points: 10
                    }
                    const createProblem = await axios.post("/data/admin/problems", problem) as { id: number };
                    problemId = createProblem.id;
                    // Create temp exec case
                    const runCase: IExecutionCase = {
                        input: "",
                        output: "hello world"
                    }
                    const createRunCase = await axios.post("/data/admin/executioncases", runCase) as { id: number };
                    execCaseId = createRunCase.id;
                    // Create temp problem exec case xref
                    const problemExecCase: IProblemExecutionCase = {
                        problem_id: problemId,
                        execution_case_id: execCaseId,
                        reltype: "RUN",
                        hidden: false
                    }
                    const createProblemExecCase = await axios.post("/data/admin/link", problemExecCase) as { id: number };
                    problemExecCaseXrefId = createProblemExecCase.id;
                });
                afterEach(async () => {
                    const deleteProblem = await axios.delete(`/data/admin/problems/${problemId}`);
                    const deleteExecCase = await axios.delete(`/data/admin/executioncases/${execCaseId}`);
                    const deleteProblemExecCaseXref = await axios.delete(`/data/admin/link/${problemExecCaseXrefId}`);
                });
    
                test("output expected to be correct", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("hello world")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: true,
                            hidden: false,
                            type: ExecutionCaseType.RUN,
                            actualOutput: "hello world",
                            expectedOutput: "hello world",
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).toHaveProperty("actualOutput");
                    expect(submissionGrade).toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
                test("output expected to be incorrect", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("it is 8/22/2024 and i do not want to do school already")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: false,
                            hidden: false,
                            type: ExecutionCaseType.RUN,
                            actualOutput: "it is 8/22/2024 and i do not want to do school already",
                            expectedOutput: "hello world",
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).toHaveProperty("actualOutput");
                    expect(submissionGrade).toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
            });
            describe("1 run case, hidden", () => {
                let problemId: number | null = null;
                let execCaseId: number | null = null;
                let problemExecCaseXrefId: number | null = null;
                beforeEach(async () => {
                    // Create temp problem
                    const problem: IProblem = {
                        name: "Unit Test, hello world, 1 run case problem, run case hidden",
                        description: "No description provided",
                        points: 10
                    }
                    const createProblem = await axios.post("/data/admin/problems", problem) as { id: number };
                    problemId = createProblem.id;
                    // Create temp exec case
                    const runCase: IExecutionCase = {
                        input: "",
                        output: "hello world"
                    }
                    const createRunCase = await axios.post("/data/admin/executioncases", runCase) as { id: number };
                    execCaseId = createRunCase.id;
                    // Create temp problem exec case xref
                    const problemExecCase: IProblemExecutionCase = {
                        problem_id: problemId,
                        execution_case_id: execCaseId,
                        reltype: "RUN",
                        hidden: true
                    }
                    const createProblemExecCase = await axios.post("/data/admin/link", problemExecCase) as { id: number };
                    problemExecCaseXrefId = createProblemExecCase.id;
                });
                afterEach(async () => {
                    const deleteProblem = await axios.delete(`/data/admin/problems/${problemId}`);
                    const deleteExecCase = await axios.delete(`/data/admin/executioncases/${execCaseId}`);
                    const deleteProblemExecCaseXref = await axios.delete(`/data/admin/link/${problemExecCaseXrefId}`);
                });
    
                test("output expected to be correct", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("hello world")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: true,
                            hidden: true,
                            type: ExecutionCaseType.RUN,
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).not.toHaveProperty("actualOutput");
                    expect(submissionGrade).not.toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
                test("output expected to be incorrect", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("it is 8/22/2024 and i do not want to do school already")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: false,
                            hidden: true,
                            type: ExecutionCaseType.RUN,
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).not.toHaveProperty("actualOutput");
                    expect(submissionGrade).not.toHaveProperty("expectedOutput"); 
                    expect(submissionGrade).toBe(EXPECTED);
                });
            });
            describe("1 assess case, shown", () => {
                let problemId: number | null = null;
                let execCaseId: number | null = null;
                let problemExecCaseXrefId: number | null = null;
                beforeEach(async () => {
                    // Create temp problem
                    const problem: IProblem = {
                        name: "Unit Test, hello world, 1 assess case problem, assess case shown",
                        description: "No description provided",
                        points: 10
                    }
                    const createProblem = await axios.post("/data/admin/problems", problem) as { id: number };
                    problemId = createProblem.id;
                    // Create temp exec case
                    const assessCase: IExecutionCase = {
                        input: "",
                        output: "hello world"
                    }
                    const createAssessCase = await axios.post("/data/admin/executioncases", assessCase) as { id: number };
                    execCaseId = createAssessCase.id;
                    // Create temp problem exec case xref
                    const problemExecCase: IProblemExecutionCase = {
                        problem_id: problemId,
                        execution_case_id: execCaseId,
                        reltype: "ASSESS",
                        hidden: false,
                    }
                    const createProblemExecCase = await axios.post("/data/admin/link", problemExecCase) as { id: number };
                    problemExecCaseXrefId = createProblemExecCase.id;
                });
                afterEach(async () => {
                    const deleteProblem = await axios.delete(`/data/admin/problems/${problemId}`);
                    const deleteExecCase = await axios.delete(`/data/admin/executioncases/${execCaseId}`);
                    const deleteProblemExecCaseXref = await axios.delete(`/data/admin/link/${problemExecCaseXrefId}`);
                });

                test("output expected to be correct", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("hello world")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: true,
                            hidden: false,
                            type: ExecutionCaseType.ASSESS,
                            actualOutput: "hello world",
                            expectedOutput: "hello world",
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).toHaveProperty("actualOutput");
                    expect(submissionGrade).toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
                test("output expected to be incorrect", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("it is 8/22/2024 and i do not want to do school already")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: false,
                            hidden: false,
                            type: ExecutionCaseType.ASSESS,
                            actualOutput: "it is 8/22/2024 and i do not want to do school already",
                            expectedOutput: "hello world",
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).toHaveProperty("actualOutput");
                    expect(submissionGrade).toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
            });
            describe("1 assess case, hidden", () => {
                let problemId: number | null = null;
                let execCaseId: number | null = null;
                let problemExecCaseXrefId: number | null = null;
                beforeEach(async () => {
                    // Create temp problem
                    const problem: IProblem = {
                        name: "Unit Test, hello world, 1 assess case problem, assess case hidden",
                        description: "No description provided",
                        points: 10
                    }
                    const createProblem = await axios.post("/data/admin/problems", problem) as { id: number };
                    problemId = createProblem.id;
                    // Create temp exec case
                    const assessCase: IExecutionCase = {
                        input: "",
                        output: "hello world"
                    }
                    const createAssessCase = await axios.post("/data/admin/executioncases", assessCase) as { id: number };
                    execCaseId = createAssessCase.id;
                    // Create temp problem exec case xref
                    const problemExecCase: IProblemExecutionCase = {
                        problem_id: problemId,
                        execution_case_id: execCaseId,
                        reltype: "ASSESS",
                        hidden: true
                    }
                    const createProblemExecCase = await axios.post("/data/admin/link", problemExecCase) as { id: number };
                    problemExecCaseXrefId = createProblemExecCase.id;
                });
                afterEach(async () => {
                    const deleteProblem = await axios.delete(`/data/admin/problems/${problemId}`);
                    const deleteExecCase = await axios.delete(`/data/admin/executioncases/${execCaseId}`);
                    const deleteProblemExecCaseXref = await axios.delete(`/data/admin/link/${problemExecCaseXrefId}`);
                });
    
                test("output expected to be correct", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("hello world")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: true,
                            hidden: true,
                            type: ExecutionCaseType.ASSESS,
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).not.toHaveProperty("actualOutput");
                    expect(submissionGrade).not.toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
                test("output expected to be incorrect", async () => {
                    if (problemId === null) { throw "problemId is null"; }
                    const CODE = `print("it is 8/22/2024 and i do not want to do school already")`;
                    const CODE_FILE_NAME = `unit_test_grading_python_${getNamingTime()}`;
                    const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                    const EXPECTED: ProblemGradingResult = [
                        {
                            pass: false,
                            hidden: true,
                            type: ExecutionCaseType.ASSESS,
                        }
                    ];
                    let submissionGrade: ProblemGradingResult = await gradeProblemSubmission(problemId, execution);
                    expect(submissionGrade).not.toHaveProperty("actualOutput");
                    expect(submissionGrade).not.toHaveProperty("expectedOutput");
                    expect(submissionGrade).toBe(EXPECTED);
                });
            });
        });
    });
});