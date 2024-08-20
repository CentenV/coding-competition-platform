// CODE EXECUTION CLASS TEST //
require("dotenv").config();
import { getNamingTime } from "../app/data/submission/timenaming";
import { Execute, PythonExecute } from "../app/data/submission/execute";
import { afterEach, describe, expect, test } from "vitest";
import { readFileSync, unlinkSync } from "node:fs";

describe("Execute class", () => {
    describe("python", () => {
        describe("hello world", () => {
            test("successful", () => {
                const CODE_FILE_NAME = `unit_test_python_${getNamingTime()}`;
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
            test("contains errors", () => {
                const CODE_FILE_NAME = `unit_test_python_${getNamingTime()}`;
                const CODE = `prin("hello world")`
                const execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
                // Validating code file
                const codeFileContents = readFileSync(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${CODE_FILE_NAME}.py`, { encoding: "utf8", flag: 'r' });
                expect(codeFileContents).toBe(CODE);
                // Run
                execution.run();
                // Validating output file
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
});