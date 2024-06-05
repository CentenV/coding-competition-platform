// INDIVIDUAL PROBLEM PAGE //
// user page dedicated for individual problems. contains the problem instructions, editor and output results
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function IndividualProblem({ params } : { params: { problemid: string } }) {
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
    
    return (
        <>
            {isLoading && <LoadingUI size={40} />}
            {isSuccess && (
                <>
                    <Header title={data.name} />
                    <div className={`${foreground}`}>
                        <div className={`m-5 text-wrap`}>{data.description}</div>
                    </div>
                </>
            )}
        </>
    );
}