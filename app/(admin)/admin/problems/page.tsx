// PROBLEMS PAGE //
// problem list management page found in the administrator page of the platform
"use client";
import Header from "@/app/_components/header";
import { AddIcon, button, foreground, primaryButton } from "@/app/_components/globalstyle";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { useEffect, useState } from "react";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loading_ui";

const REFRESH_INTERVAL: number = 1000;
const COLUMNS: string[] = ["ID", "Problem Name", "Problem Description", "Points"];

// Page Component
export default function ProblemsPage() {
    let PAGE_TITLE: string = "Problems";

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();
    // Collection of problems
    const [problems, updateProblems] = useState<IProblem | null>(null);

    // Fetch and check if data changed in a certain interval
    useEffect(() => {
        const fetchRefreshInterval = setInterval(async () => {
            const fetch: IProblem = await getProblems();
            if (fetch !== problems) {
                updateProblems(fetch);
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(fetchRefreshInterval);
    }, []);

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <div className={`${foreground}`}>
                {/* // Print out all rows of problems */}
                <div>
                    {problems == null ? <LoadingUI size={40} /> :
                        (
                            <>
                                <div className={`mb-4`}>
                                    <div className={`${button} ${primaryButton} flex flex-row gap-2 w-min`} onClick={(event: React.MouseEvent<HTMLElement>) => {
                                        event.preventDefault();
                                        ROUTER.push("/admin/problems/create");
                                    }}>
                                        <span><AddIcon /></span>
                                        <span>New</span>
                                    </div>
                                </div>
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
                                                    <tr className={`bg-zinc-200 border-t-2 border-b-2 border-white hover:bg-stone-300 hover:cursor-pointer`} key={`${key}_entry`} onClick={() => ROUTER.push(`/admin/problems/${obj.id}`)}>
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
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

// Get problems helper function
async function getProblems(): Promise<IProblem> {
    // Query getting all problems from db
    const request = await fetch("/data/problems", { method: "GET", cache: "no-cache" });
    const problems = await request.json();

    return problems as IProblem;
}