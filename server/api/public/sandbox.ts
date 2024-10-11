// SUBMISSION: SANDBOX API ROUTE //
// USER API route for submitting code in a sandbox environment - no run cases or tests are ran on I/O
import { ISandboxSubmissionRequest, ISandboxSubmissionResponse, SubmissionLanguage } from "@/app/types";
import { Execute, PythonExecute } from "../../execute";
import { Router } from "express";

const router = Router()

router.post("/", (req, res) => {
    try {
        // Request Body
        const requestBody: ISandboxSubmissionRequest = req.body as ISandboxSubmissionRequest;

        // Run code in Docker
        console.log("Request received: " + JSON.stringify(requestBody));
        // const language: SubmissionLanguage = requestBody.language;  // TODO: individual language
        const code: string = requestBody.code;

        // Execute code and get output
        // TODO: individual language
        // const codeExecution: Execute = new PythonExecute(`test_sandbox_${}_${}`, code);
        const codeExecution: Execute = new PythonExecute(`test`, code);
        const codeOutput: string = codeExecution.run();

        const responsePayload: ISandboxSubmissionResponse = { output: codeOutput };

        res.status(200).json(responsePayload);
    }
    catch (err) {
        res.status(500).json({ message: "Unable to execute sandbox code", error: err });
    }
});


export default router;