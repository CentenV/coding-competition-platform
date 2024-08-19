// CODE EXECUTION CLASS TEST //
import { getNamingTime } from "../../app/data/submission/timenaming";
import { Execute, PythonExecute } from "../../app/data/submission/execute";
import { describe } from "vitest";

describe("Execute class", () => {
    describe("python", () => {
        const CODE_FILE_NAME = `unit_test_python_${getNamingTime()}`;
        const CODE = `print("hello world")`
        console.log(CODE_FILE_NAME);
        let execution: Execute = new PythonExecute(CODE_FILE_NAME, CODE);
    });
});