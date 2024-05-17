// PROBLEM LIST COMPONENT //
// Component that displays all the problems in a table list
"use client"
import { IProblem } from '@/app/_components/interfaces';
import LoadingUI from '@/app/_components/loadingui';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const REFRESH_INTERVAL: number = 1000;
const COLUMNS: string[] = ["ID", "Problem Name", "Problem Description", "Points"];

// Component
export default function ProblemList() {
    // Collection of problems
    const [problems, updateProblems] = useState<IProblem | null>(null);

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Fetch and check if data changed in a certain interval
    useEffect(() => {
        const fetchRefreshInterval = setInterval(async () => {
            const fetch: IProblem = await getProblems();
            if (fetch !== problems) {
                updateProblems(fetch);
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(fetchRefreshInterval);
    }, [problems]);

    return (
        // Print out all rows of problems
        <div>
            {problems === null ? <LoadingUI /> : 
                (
                    <div className={`border-2 border-neutral-500 rounded-md overflow-hidden`}>
                        <table className={`w-full`}>
                            <thead>
                                <tr className={`bg-neutral-400 text-left border-b-2 border-b-neutral-500`}>
                                    {COLUMNS.map((columnName: string) => {
                                        return (
                                            <th className={`px-3 py-2 font-bold uppercase text-sm select-none`} key={`${columnName}_table_header`}>{columnName}</th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(problems).map(([key, obj]) => {
                                    return (
                                        <tr className={`bg-zinc-200 border-t-2 border-b-2 border-white hover:bg-stone-300 hover:cursor-pointer`} key={`${key}_entry`} onClick={() => ROUTER.push(`/admin/problems/edit/${obj.id}`)}>
                                            <td className={`px-3 py-2 select-none`} key={`${key}_id`}>{obj.id}</td>
                                            <td className={`px-3 py-2`} key={`${key}_name`}>{obj.name}</td>
                                            <td className={`px-3 py-2`} key={`${key}_description`}>{obj.description}</td>
                                            <td className={`px-3 py-2`} key={`${key}_points`}>{obj.points}</td>
                                        </tr>
                                    );
                                })}  
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}


// Get problems helper function
async function getProblems(): Promise<IProblem> {
    // Query getting all problems from db
    const request = await fetch("/data/problems", { method: "GET", cache: "no-cache" });
    const problems = await request.json();

    return problems as IProblem;
}