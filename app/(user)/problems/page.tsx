// USER PROBLEMS LIST //
// lists out all of the problems that the user needs to complete/already completed, details, and provides a base link to the individual problems
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

// Problem list component on for the user-end
export default function UserProblemList() {
    // Problem list reactive
    const [problems, updateProblems] = useState<IProblem[] | null>(null);

    // Fetching all required data
    useEffect(() => {
        // Fetch all problems
        async function fetchProblems() {
            const request = await fetch("/data/problems", { method: "GET" });
            const problems = (await request.json()) as IProblem[];
            console.log(problems);
            updateProblems(problems);
        }
        fetchProblems();
    }, []);

    return (
        <>
            <Header title="Problems" />
            {/* Render problem cards */}
            <div>
                {(problems == null) ?
                    <div className={`${foreground}`}>
                        <LoadingUI size={40} />
                    </div> 
                : <ProblemCard problemData={problems[0]} />}
            </div>
        </>
    );
}
/*
problems.map((problem: IProblem) => {
                    
                })
 */
// Individual problem card
function ProblemCard({ problemData } : { problemData: IProblem }) {
    // function
    const ROUTER: AppRouterInstance = useRouter();

    return (
        <div className={`${foreground} grid grid-rows-2 grid-cols-2 w-full cursor-pointer`} onClick={(event: React.MouseEvent<HTMLDivElement>) => { event.preventDefault(); ROUTER.push(`/problems/${problemData.id}`); }}>
            <div className={`text-2xl font-bold row-span-1 col-span-1`}>{problemData.name}</div>
            <div>{problemData.points} points</div>
            <div>Difficulty</div>
        </div>
    );
}