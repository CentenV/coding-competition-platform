// EDIT PROBLEM PAGE //
// dynamic route page that is used to manage a problem by dynamically passing in the problem id when passing it in the url
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import ManageProblem, { Action } from "@/app/_components/manage_problem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditProblem({ params }: { params: { problemid: string } }) {
    // Problem id from url
    const PROBLEM_ID = Number(params.problemid);

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();
    // Query client
    const queryClient = useQueryClient();

    // Fetch specific problem data
    const QUERY_KEY: string[] = [`problem_${PROBLEM_ID}`];
    const { data, error, isLoading, isFetching, isError, isSuccess, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            // Query getting specific problem from db
            const { data } = await axios.get(`/data/problems/${PROBLEM_ID}`);
            return data as IProblem;
        },
        refetchOnMount: "always",
    });

    return (
        <div>
            <Header title={`Edit Problem - `} />
            <div className={`${foreground}`}>
                {(isLoading || isFetching) && <LoadingUI size={40} />}
                {isError && (<div>Error occurred: {error.message}</div>)}
                {(isSuccess && !isFetching && data != undefined) ? <ManageProblem problemData={data} problemId={PROBLEM_ID} actionType={Action.UPDATE} submitButtonText={"Update"} deletable={true} /> : null}
            </div>
        </div>
    )
}