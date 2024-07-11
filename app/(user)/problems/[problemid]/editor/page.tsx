// INDIVIDUAL PROBLEM EDITOR //
// user page that contains the embedded editor, run, output results
"use client";
import { LeftArrowIcon, button, divider, foreground, foregroundAlternate, header, subHeader } from "@/app/_components/globalstyle";
import { IProblemSubmissionResponse, IProblem, IProblemSubmissionRequest, SubmissionLanguage } from "@/app/types";
import LoadingUI from "@/app/_components/loading_ui";
import { Editor } from "@monaco-editor/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import CodeCases from "../../components/codecases";

export default function IndividualProblemEditor({ params } : { params: { problemid: string } }) {
    // TODO: unique user id
    const USER_ID = 1;

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Code field input
    const codeEditor = useRef<any>(null);

    // Extract problem from the URL
    const PROBLEM_ID = Number(params.problemid);

    // Query for problem data
    const PROBLEM_INFO = useQuery({
        queryKey: [`problem_${PROBLEM_ID}`],
        queryFn: async () => {
            // Query getting specific problem from db
            const { data } = await axios.get(`/data/problems/${PROBLEM_ID}`);
            return data as IProblem;
        },
    });
    // Query for submitting problem
    const PROBLEM_SUBMISSION = useMutation({
        mutationKey: [`problem_${PROBLEM_ID}_${USER_ID}_submission`],
        mutationFn: async (inputtedCode: string) => {
            // Prepare request for Rest API
            const formattedData: IProblemSubmissionRequest = {
                problemId: PROBLEM_ID,
                code: inputtedCode,
                language: SubmissionLanguage.PYTHON,
            };
            // Query submitting code to the server for execution
            const { data } = await axios.post<IProblemSubmissionResponse[]>(`/data/submission/${PROBLEM_ID}`, formattedData);
            console.log(data);
            return data;
        }
    });

    // Bind the editor to React ref
    function codeEditorLoaded(editor: any) {
        codeEditor.current = editor;
    }

    // Run code
    async function runCode() {
        // Clear currently displayed output
        // updateOutput(null);

        // Submit code to server to handle and fetching code from editor
        console.log(codeEditor?.current?.getValue());
        PROBLEM_SUBMISSION.mutate(codeEditor?.current?.getValue());
    }
    
    return (
        <>
            {PROBLEM_INFO.isLoading && <div className="mt-4"><LoadingUI size={40} /></div>}
            {PROBLEM_INFO.isSuccess && (
                <>
                    <div className={`grid grid-rows-2 grid-cols-2 h-full w-full min-w-0 gap-4`}>
                        {/* Code editor */}
                        <div className={`flex flex-col h-full w-full min-w-0 row-span-2 col-span-1`}>
                            <div className={`mb-2`}>
                                <button className={`${button}`} onClick={() => ROUTER.back()} ><LeftArrowIcon/></button>
                                <button className={`${button}`} onClick={runCode}>Run Code</button>
                            </div>
                            <div className={`${foregroundAlternate} grow`}>
                                <Editor height={"100%"} width={"100%"} onMount={codeEditorLoaded} language="python" />
                            </div>
                            {/* {(output != null) ? <p className={"whitespace-pre-line"}>{output}</p> : <></>} */}
                        </div>
                        {/* Problem details */}
                        <div className={`${foreground} flex flex-col gap-3 h-full w-full min-w-0 grow-0 row-span-1 col-span-1 overflow-scroll`}>
                            <div>
                                <div className={`${header}`}>{PROBLEM_INFO.data.name}</div>
                                <div className={`${subHeader}`}>{PROBLEM_INFO.data.points} {(PROBLEM_INFO.data.points == 1) ? "point" : "points"}</div>
                            </div>
                            <div className={`${divider}`}></div>
                            <div>{PROBLEM_INFO.data.description}</div>
                        </div>
                        {/* Problem output/test case status */}
                        <div className={`${foreground} row-span-1 col-span-1`}>
                            {PROBLEM_SUBMISSION.data == undefined && !PROBLEM_SUBMISSION.isPending && <div>No data to display</div>}
                            {PROBLEM_SUBMISSION.isPending && <LoadingUI size={40} />}
                            {PROBLEM_SUBMISSION.isSuccess && (<CodeCases cases={PROBLEM_SUBMISSION.data} />)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}