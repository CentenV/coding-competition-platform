// ADMIN PROBLEMS PAGE //
// problem list management page found in the administrator page of the platform
"use client";
import { AddIcon, button, foreground, primaryButton } from "@/app/_components/globalstyle";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { useEffect, useState } from "react";
import { IProblem } from "@/app/types";
import LoadingUI from "@/app/_components/loading_ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderedContent from "@/app/_components/headered_content";

const REFRESH_INTERVAL: number = 1000;

// Page Component
export default function ProblemsPage() {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Table header styling
    const TABLE_HEADER: string = "px-3 py-2 font-bold uppercase text-sm select-none";

    // Fetch problems constantly polling to check if data changed in a certain interval
    const { data, error, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["admin_problems"],
        queryFn: async () => {
            // Query getting all problems from db
            const { data } = await axios.get("/data/problems");
            return data as IProblem[];
        },
        refetchInterval: REFRESH_INTERVAL,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
    });

    return (
        <HeaderedContent header="Problems">
            <div className={`${foreground}`}>
                {/* // Print out all rows of problems */}
                <div>
                    {isLoading && <LoadingUI size={40} />}
                    {isError && (<div>Error occurred: {error.message}</div>)}
                    {(isSuccess && data !== undefined) ? 
                        (
                            <>
                                {/* New Problem */}
                                <div className={`mb-4`}>
                                    <div className={`${button} ${primaryButton} flex flex-row gap-2 w-min`} onClick={(event: React.MouseEvent<HTMLElement>) => {
                                        event.preventDefault();
                                        ROUTER.push("/admin/problems/create");
                                    }}>
                                        <span><AddIcon /></span>
                                        <span>New</span>
                                    </div>
                                </div>
                                {/* Table of Problems */}
                                <div className={`border-2 border-neutral-500 rounded-md overflow-hidden`}>
                                    <table className={`w-full`}>
                                        <thead>
                                            <tr className={`bg-neutral-400 text-left border-b-2 border-b-neutral-500`}>
                                                <th className={`${TABLE_HEADER} w-0`}>ID</th>
                                                <th className={`${TABLE_HEADER} w-1/4`}>Problem Name</th>
                                                <th className={`${TABLE_HEADER} w-1/3 text-ellipsis truncate`}>Problem Description</th>
                                                <th className={`${TABLE_HEADER} w-min`}>Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(data).map(([key, obj]) => {
                                                return (
                                                    <tr className={`bg-zinc-200 border-t-2 border-b-2 border-white hover:bg-stone-300 hover:cursor-pointer`} key={`${key}_entry`} onClick={() => ROUTER.push(`/admin/problems/${obj.id}`)}>
                                                        <td className={`px-3 py-2 select-none`} key={`${key}_id`}>{obj.id}</td>
                                                        <td className={`px-3 py-2 select-none`} key={`${key}_name`}>{obj.name}</td>
                                                        <td className={`px-3 py-2 select-none  w-6/12 text-ellipsis truncate text-nowrap`} key={`${key}_description`}>{obj.description}</td>
                                                        <td className={`px-3 py-2 select-none`} key={`${key}_points`}>{obj.points}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </HeaderedContent>
    )
}