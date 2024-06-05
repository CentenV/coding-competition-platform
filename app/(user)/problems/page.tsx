// USER PROBLEMS LIST //
// lists out all of the problems that the user needs to complete/already completed, details, and provides a base link to the individual problems
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

const REFRESH_INTERVAL: number = 2000;

// Problem list component
export default function UserProblemList() {
    // Fetching all required data
    // problems
    const problemsQuery = useQuery({
        queryKey: ["user_problems"],
        queryFn: async () => {
            // Query getting all problems from db
            const { data } = await axios.get("/data/problems");
            return data as IProblem[];
        },
        refetchInterval: REFRESH_INTERVAL,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    });
    // completed problems
    // const completionQuery = 

    return (
        <>
            <Header title="Problems" />
            {/* Render problem cards */}
            {(problemsQuery.isLoading) && <LoadingUI size={40} />}
            {(problemsQuery.isSuccess && problemsQuery.data != undefined) && (
                <>
                    <div className="flex flex-col gap-2">
                        {problemsQuery.data.map((problem: IProblem) => <ProblemCard problemData={problem} key={problem.id} />)}
                    </div>
                </>
            )}
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