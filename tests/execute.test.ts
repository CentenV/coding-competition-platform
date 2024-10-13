// CODE EXECUTION CLASS TEST //
import { getNamingTime } from "../server/timenaming";
import { Execute, PythonExecute } from "../server/execute";
import { describe, expect, test } from "vitest";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import "dotenv/config";

/**
 * General test function that manages 
 * @param code 
 * @param expected_output 
 * @param error 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function executeTest<T>(code: string, expected_output: string, error?: { expected_error_output?: string }) {
    const CODE_FILE_NAME = `unit_test_execute_python_${getNamingTime()}`;
    function createInstance<T>(execType: { new(CODE_FILE_NAME: string, code: string): T }): T { return new execType(CODE_FILE_NAME, code); }
    const execution: Execute = createInstance(PythonExecute);
    // Validating code file
    const codeFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`, { encoding: "utf8", flag: 'r' });
    expect(codeFileContents).toBe(code);
    // Run
    const { stdout, stderr } = await execution.run();
    // Validating output file
    const outputFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`, { encoding: "utf8", flag: 'r' })
    expect(outputFileContents).toBe(expected_output);
    expect(outputFileContents).toBe(stdout);
    expect(stdout).toBe(expected_output);
    // Verify stderr
    if (error) {
        // Error file is created
        console.log("error in occurred");
        // console.log(`${process.env.COMPETITION_SERVICE_DIR}/errors/${CODE_FILE_NAME}_error.txt`)
        expect(existsSync(`${process.env.COMPETITION_SERVICE_DIR}/errors/${CODE_FILE_NAME}_error.txt`)).toBe(true);
        const errorOutputFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/errors/${CODE_FILE_NAME}_error.txt`, { encoding: "utf8" })
        expect(errorOutputFileContents).toBe(error.expected_error_output);
        unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/errors/${CODE_FILE_NAME}_error.txt`);
    }
    else {
        // No file is created
        expect(existsSync(`${process.env.COMPETITION_SERVICE_DIR}/errors/${CODE_FILE_NAME}_error.txt`)).toBe(false);
        expect(stderr).toBe("");
    }
    // Clean up
    unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`);
    unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`);
}

describe("Execute class", () => {
    describe.concurrent("python", () => {
        test.concurrent("hello world", async () => {
            const CODE = `print("hello world")`;
            const EXPECTED_OUTPUT = "hello world\n";
            await executeTest<PythonExecute>(CODE, EXPECTED_OUTPUT);
        });
        test.concurrent("long output program", async () => {
            const CODE = 
`for i in range(0, 100000):
    print(i)
`;
            let EXPECTED_OUTPUT = "";
            for (let i = 0; i < 100000; i++) {
                EXPECTED_OUTPUT += `${i}\n`;
            }
            await executeTest<PythonExecute>(CODE, EXPECTED_OUTPUT);
        });
        test.concurrent("contains error (syntax)", async () => {
            const CODE = `prin("hello world")`;
            const EXPECTED_OUTPUT = "";
            const EXPECTED_ERROR_OUTPUT = `Traceback (most recent call last):
  File "/exec/prog.py", line 1, in <module>
    prin("hello world")
    ^^^^
NameError: name 'prin' is not defined. Did you mean: 'print'?\n`;
            await executeTest(CODE, EXPECTED_OUTPUT, { expected_error_output: EXPECTED_ERROR_OUTPUT });
        });
    });
}, { timeout: 10000 });

// TODO
// execution with input
// long execution timeout