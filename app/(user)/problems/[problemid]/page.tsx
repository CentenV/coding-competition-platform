// INDIVIDUAL PROBLEM PAGE //
// user page dedicated for individual problems. contains the problem instructions, editor and output results
"use client";
import { button, divider, foreground, foregroundAlternate, header, subHeader } from "@/app/_components/globalstyle";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

export default function IndividualProblem({ params } : { params: { problemid: string } }) {
    // Code field input
    const codeEditor = useRef<any>(null);

    // Extract problem from the URL
    const PROBLEM_ID = Number(params.problemid);

    // Query for problem data
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: [`problem_${PROBLEM_ID}`],
        queryFn: async () => {
            // Query getting specific problem from db
            const { data } = await axios.get(`/data/problems/${PROBLEM_ID}`);
            return data as IProblem;
        },
    });

    // Bind the editor to React ref
    function codeEditorLoaded(editor: any) {
        codeEditor.current = editor;
    }
    
    return (
        <>
            {isLoading && <div className="mt-4"><LoadingUI size={40} /></div>}
            {isSuccess && (
                <>
                    <div className={`flex flex-row h-full w-full min-w-0 gap-4`}>
                        <div className={`flex flex-col h-full w-full min-w-0`}>
                            <div className={`mb-2`}>
                                {/* <button className={`${button}`} onClick={runCode}>Run Code</button> */}
                                <button className={`${button}`} >Run Code</button>
                            </div>
                            <div className={`${foregroundAlternate} grow`}>
                                <Editor height={"100%"} width={"100%"} onMount={codeEditorLoaded} language="python" />
                            </div>
                            {/* {(output != null) ? <p className={"whitespace-pre-line"}>{output}</p> : <></>} */}
                        </div>
                        <div className={`${foreground} flex flex-col gap-3 h-full w-full min-w-0 grow-0 overflow-scroll`}>
                            <div>
                                <div className={`${header}`}>{data.name}</div>
                                <div className={`${subHeader}`}>{data.points} {(data.points == 1) ? "point" : "points"}</div>
                            </div>
                            <div className={`${divider}`}></div>
                            <div>{data.description}</div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}