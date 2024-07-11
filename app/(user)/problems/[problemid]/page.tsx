// INDIVIDUAL PROBLEM PAGE //
// user page dedicated for individual problems. contains the problem instructions, any additional data including status, etc,
"use client";
import { divider, foreground, header, subHeader } from "@/app/_components/globalstyle";
import LoadingUI from "@/app/_components/loading_ui";
import { IProblem } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function IndividualProblem({ params }: { params: { problemid: string } }) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

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
            {isLoading && <div className={`${foreground}`}><LoadingUI size={40} /></div>}
            {isSuccess &&
                (<div className={`${foreground} flex flex-col gap-3 h-full w-full min-w-0 grow-0 overflow-x-hidden overflow-y-scroll`}>
                    <div>
                        <div className={`${header}`}>{data.name}</div>
                        <div className={`${subHeader}`}>{data.points} {(data.points == 1) ? "point" : "points"}</div>
                    </div>
                    <div className={`${divider}`}></div>
                    <div>{data.description}</div>
                    <div>
                        <button onClick={() => { ROUTER.push(`/problems/${PROBLEM_ID}/editor`) }}>Open Editor</button>
                    </div>
                </div>)
            }
        </>
        
    );
}