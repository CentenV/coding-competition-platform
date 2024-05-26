// CODING PLAYGROUND/SANDBOX PAGE //
// the page used for the competitor (client) to test code
"use client";
import { useRef, useState } from "react";
import { button, foregroundAlternate } from "@/app/_components/globalstyle";
import LoadingUI from "@/app/_components/loading_ui";
import { Editor, Monaco } from "@monaco-editor/react";
import Header from "@/app/_components/header";

// Page component
export default function SandboxPage() {
    // Code field input
    // const [code, updateCode] = useState<string>("");
    const codeEditor = useRef<any>(null);

    // Output result
    const [output, updateOutput] = useState<string | null>(null);
    const [waiting, updateWaiting] = useState<boolean>(false);

    // Run code
    async function runCode() {
        // Clear currently displayed output
        updateOutput(null);
        updateWaiting(true);

        // Format to for Rest API
        const formattedData = JSON.stringify({
            code: getCode()
        });
        
        // Submit code to server to handle
        const request: Response = await fetch("/data/submission", { method: "POST", body: formattedData, cache: "no-cache" });
        const executedCodeOutput: string = (await request.json()).output;

        updateWaiting(false);
        updateOutput(executedCodeOutput);
    }

    // Bind the editor to React ref
    function codeEditorLoaded(editor: any, monaco: Monaco) {
        codeEditor.current = editor;
    }

    // Getting value from editor
    function getCode(): string {
        return codeEditor?.current?.getValue();
    }
    

    return (
        <>
            <Header title="Sandbox" />
            <div className={`h-full w-full`}>
                <div className={`${foregroundAlternate}`}>
                    <Editor height={"80vh"} width={"auto"} onMount={codeEditorLoaded} language="python" />
                </div>
                <button className={`${button}`} onClick={runCode}>Run Code</button>
                {(output != null) ? <p className={"whitespace-pre-line"}>{output}</p> : <></>}
                {(waiting) ? <LoadingUI /> : <></>}
            </div>
        </>
        
    );
}