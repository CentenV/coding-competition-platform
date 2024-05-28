// EDIT PROBLEM PAGE //
// dynamic route page that is used to manage a problem by dynamically passing in the problem id when passing it in the url
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import ManageProblem, { Action } from "@/app/_components/problem_management";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProblem({ params }: { params: { problemid: string } }) {
    const PAGE_TITLE = "Edit Problem";
    const PROBLEM_ID = Number(params.problemid);

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Collection of problem data
    const [problem, updateProblem] = useState<IProblem>({} as IProblem);

    // Wait for data to be fetched and validate if any data has been changed
    useEffect(() => {
        const load = async () => {
            updateProblem(await getProblem(PROBLEM_ID));
        }
        load();
    }, []);

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <div className={`${foreground}`}>
                {(Object.keys(problem).length === 0) ? <LoadingUI size={40} /> :
                    <ManageProblem actionType={Action.UPDATE} problemData={problem} submitButtonText={"Update"} deletable={true} />
                }
            </div>
        </div>
    )
}


// Get problem helper function
async function getProblem(id: number): Promise<IProblem> {
    // Query getting all problems from db
    const request = await fetch(`/data/problems/${id}`, { method: "GET", cache: "no-cache" });
    const problems = await request.json();

    return problems as IProblem;
}