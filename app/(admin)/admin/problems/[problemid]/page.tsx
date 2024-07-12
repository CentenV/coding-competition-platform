// EDIT PROBLEM PAGE //
// dynamic route page that is used to manage a problem by dynamically passing in the problem id when passing it in the url
"use client";
import { foreground } from "@/app/_components/globalstyle";
import { IProblem, ITabbedMenuEntry } from "@/app/types";
import LoadingUI from "@/app/_components/loading_ui";
import ManageProblem, { Action } from "@/app/_components/manage_problem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import HeaderedContent from "@/app/_components/headered_content";

export default function EditProblem({ params }: { params: { problemid: string } }) {
    // Problem id from url
    const PROBLEM_ID = Number(params.problemid);

    // List of run cases
    let runCases: ITabbedMenuEntry[] = [];
    // List of test cases
    let testCases = [];

    // Fetch specific problem data
    const { data, error, isLoading, isFetching, isError, isSuccess, refetch } = useQuery({
        queryKey: [`problem_${PROBLEM_ID}`],
        queryFn: async () => {
            // Query getting specific problem from db
            const { data } = await axios.get(`/data/problems/${PROBLEM_ID}`);
            return data as IProblem;
        },
        refetchOnWindowFocus: false
    });

    return (
        <>
            { (isLoading || isFetching) && <div className={`${foreground}`}><LoadingUI size={40} /></div> }
            { isError && <div className={`${foreground}`}>Error occurred: {error.message}</div> }
            { (isSuccess && !isFetching && data != undefined) &&
                <HeaderedContent header={`Edit Problem - ${data?.name}`}>
                    <ManageProblem problemData={data} problemId={PROBLEM_ID} actionType={Action.UPDATE} submitButtonText={"Update"} deletable={true} />
                </HeaderedContent>
            }
        </>
    )
}