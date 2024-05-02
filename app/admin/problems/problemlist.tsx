// PROBLEM LIST COMPONENT //
// Component that displays all the problems in a table list

"use client"
import { foreground } from "@/app/_components/globalstyle";
import { useEffect, useState } from "react";

const REFRESH_INTERVAL: number = 1000;
const COLUMNS: string[] = ["ID", "Problem Name", "Problem Description", "Points"];

// Component
export default function ProblemList() {
    // Constantly update list of problems whenever there is a change
    const [problems, updateProblems] = useState<IProblem | null>(null);

    // Fetch and check if data changed in a certain interval
    useEffect(() => {
        const t = setInterval(async () => {
            const fetch: IProblem = await getProblems();
            if (fetch !== problems) {
                updateProblems(fetch);
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(t);
    }, [problems]);

    return (
        // Print out all rows of problems
        <div className={`${foreground}`}>
            {problems === null ? <div>Loading</div> : 
                (
                    <table className={`w-full`}>
                        <thead>
                            <tr className={`bg-neutral-400`}>
                                {COLUMNS.map((columnName: string) => {
                                    return (
                                        <th key={`${columnName}_table_header`}>{columnName}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(problems).map(([key, obj]) => {
                                return (
                                    <tr key={`${key}_entry`} className={`bg-zinc-300`}>
                                        <td key={`${key}_id`}>{obj.id}</td>
                                        <td key={`${key}_name`}>{obj.name}</td>
                                        <td key={`${key}_description`}>{obj.description}</td>
                                        <td key={`${key}_points`}>{obj.points}</td>
                                    </tr>
                                );
                            })}  
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}


// Get problems
async function getProblems(): Promise<IProblem> {
    // Query getting all problems from db
    const request = await fetch("http://localhost:3000/data/problems", { method: "GET", cache: "no-store" });
    const problems = await request.json();

    return problems as IProblem;
}

// Problems structure
interface IProblem {
    id: number,
    name: string,
    description: string,
    // points: number
}