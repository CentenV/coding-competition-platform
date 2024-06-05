// CODING PLAYGROUND/SANDBOX PAGE //
// the page used for the competitor (client) to test code
"use client";
import { useEffect, useRef, useState } from "react";
import { button, foregroundAlternate } from "@/app/_components/globalstyle";
import LoadingUI from "@/app/_components/loading_ui";
import { Editor, Monaco } from "@monaco-editor/react";
import Header from "@/app/_components/header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Page component
export default function SandboxPage() {
    // Code field input
    // const [code, updateCode] = useState<string>("");
    const codeEditor = useRef<any>(null);

    // Output result
    const [output, updateOutput] = useState<string | null>(null);
    const [waiting, updateWaiting] = useState<boolean>(false);

    // Mutation to push code to the backend to run
    const { data, mutate, isSuccess, isError, error, isPending } = useMutation({
        mutationKey: [`sandbox_execute`],
        mutationFn: async (inputtedCode: string) => {
            // Format to for Rest API
            const formattedData = JSON.stringify({
                code: inputtedCode
            });
            // Send POST request and return data
            const { data } = await axios.post("/data/submission", formattedData);
            console.log(data);
            return data.output as string;
        },
    });

    // Bind the editor to React ref
    function codeEditorLoaded(editor: any, monaco: Monaco) {
        codeEditor.current = editor;
    }

    // Run code
    async function runCode() {
        // Clear currently displayed output
        updateOutput(null);
        
        // Submit code to server to handle
        mutate(getCode());
    }

    // Getting value from editor
    function getCode(): string {
        return codeEditor?.current?.getValue();
    }

    return (
        <>
            <Header title="Sandbox" />
            <div className={`flex flex-row h-full w-full min-w-0 gap-4`}>
                <div className={`flex flex-col h-full w-full min-w-0`}>
                    <div className={`mb-2`}>
                        <button className={`${button}`} onClick={runCode}>Run Code</button>
                    </div>
                    <div className={`${foregroundAlternate} grow`}>
                        <Editor height={"100%"} width={"100%"} onMount={codeEditorLoaded} language="python" />
                    </div>
                    {(output != null) ? <p className={"whitespace-pre-line"}>{output}</p> : <></>}
                </div>
                <div className={`${foregroundAlternate} h-full w-full min-w-0 grow-0 overflow-scroll`}>
                    {(data == undefined && error == undefined && !isPending) && <pre className={`text-neutral-500 italic`}>No output</pre>}
                    {(isPending) && <pre>⏳ Running...</pre>}
                    {(isError && !isPending) && <pre className={`text-red-500 font-bold`}>{error.message}</pre>}
                    {(data != undefined && !isPending && isSuccess) && <pre className={`min-w-0 `}>{data}</pre>}
                </div>
            </div>
        </>
    );
}