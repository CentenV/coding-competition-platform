// CODING PLAYGROUND/SANDBOX PAGE //
// the page used for the competitor (client) to test code
"use client";
import { ChangeEvent, SyntheticEvent, useReducer, useState } from "react";
import { button } from "../_components/globalstyle";
import LoadingUI from "../_components/loadingui";
import { ISubmissionResponse } from "../_components/interfaces";

// Page component
export default function SandboxPage() {
    // Code field input
    const [code, updateCode] = useState<string>("");

    // Output result
    const [output, updateOutput] = useState<string | null>(null);
    const [waiting, updateWaiting] = useState<boolean>(false);

    // Run
    async function runCode(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        // Clear currently displayed output
        updateOutput(null);
        updateWaiting(true);

        // Format to for Rest API
        const formattedData = JSON.stringify({
            code: code
        });
        
        // Submit code to server to handle
        const request: Response = await fetch("/data/submission", { method: "POST", body: formattedData, cache: "no-cache" });
        const executedCodeOutput: string = (await request.json()).output;

        updateWaiting(false);
        updateOutput(executedCodeOutput);
    }

    return (
        <>
            <form onSubmit={runCode}>
                <textarea name="code" className={`border-2 border-black w-full p-2`} rows={10} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    event.preventDefault();
                    updateCode(event.target.value);
                }} />
                <input type="submit" className={`${button}`} value={"Run Code"} />
            </form>
            {(output != null) ? <p className={"whitespace-pre-line"}>{output}</p> : <></>}
            {(waiting) ? <LoadingUI/> : <></>}
        </>
    );
}