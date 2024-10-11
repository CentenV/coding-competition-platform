// CODE EXECUTION CLASS TEST //
import { getNamingTime } from "../server/timenaming";
import { Execute, PythonExecute } from "../server/execute";
import { describe, expect, test } from "vitest";
import { readFile, readFileSync, unlinkSync } from "node:fs";
import "dotenv/config";

describe("Execute class", () => {
    describe("python", () => {
        test("hello world", () => {
            const CODE_FILE_NAME = `unit_test_execute_python_${getNamingTime()}`;
            const CODE = `print("hello world")`
            const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
            // Validating code file
            const codeFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`, { encoding: "utf8", flag: 'r' });
            expect(codeFileContents).toBe(CODE);
            // Run
            execution.run();
            // Validating output file
            const EXPECTED_OUTPUT = "hello world\n";
            const outputFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`, { encoding: "utf8", flag: 'r' })
            expect(outputFileContents).toBe(EXPECTED_OUTPUT);
            // Clean up
            unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`);
            unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`);
        });
        test.skip("long output program", () => {
            const CODE_FILE_NAME = `unit_test_execute_python_${getNamingTime()}`;
            const CODE = 
`for i in range(0, 1000000):
    print(i)
`;
            const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
            // Validating code file
            const codeFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`, { encoding: "utf8", flag: 'r' });
            expect(codeFileContents).toBe(CODE);
            // Run
            execution.run();
            // Validating output file
            let EXPECTED_OUTPUT = "";
            for (let i = 0; i < 100000; i++) {
                EXPECTED_OUTPUT += `${i}\n`;
            }
            const outputFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`, { encoding: "utf8", flag: 'r' })
            expect(outputFileContents).toBe(EXPECTED_OUTPUT);
        });
        test.skip("contains syntax error", () => {
            const CODE_FILE_NAME = `unit_test_execute_python_${getNamingTime()}`;
            const CODE = `prin("hello world")`
            const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
            // Run
            execution.run();
            // Validating output
            const EXPECTED_OUTPUT = 
`Traceback (most recent call last):
  File "/exec/prog.py", line 1, in <module>
    prin("hello world")
    ^^^^
NameError: name 'prin' is not defined. Did you mean: 'print'?`;
            const outputFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`, { encoding: "utf8", flag: 'r' })
            expect(outputFileContents).toContain(EXPECTED_OUTPUT);

            // Clean up
            unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`);
            unlinkSync(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${CODE_FILE_NAME}.txt`);
        });
    });
});

// TODO
// execution with input
// long execution timeout