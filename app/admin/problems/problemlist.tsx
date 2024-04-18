// Problem List Component //
"use client"
import { useEffect, useState } from "react";

const REFRESH_INTERVAL: number = 1000;

// Component
export default function ProblemList() {
    // Constantly update list of problems whenever there is a change
    const [problems, updateProblems] = useState<Object>({});

    // Fetch and check if data changed in a certain interval
    useEffect(() => {
        const t = setInterval(async () => {
            const fetch: Object = await getProblems();
            if (fetch != problems) {
                updateProblems(fetch);
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(t);
    }, [problems]);

    return (
        <div>
            {/* Print out all rows of problems */}
            {Object.keys(problems).length === 0 ? <div>Loading</div> : Object.entries(problems).map(([key, obj]) => {
                return (
                    <div key={key}>
                        <span>{obj.id}</span>
                        <span>{obj.name}</span>
                        <span>{obj.description}</span>
                    </div>
                );
            })}
        </div>
    );
}


// Get problems
async function getProblems() {
    // Query getting all problems from db
    const request = await fetch("http://localhost:3000/data/problems", { cache: "no-store" });
    const problems = await request.json();

    return problems;
}