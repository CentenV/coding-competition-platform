// Problem List Component //
"use client";

export default async function ProblemList() {
    // Get problems
    async function getProblems() {
        // Query getting all problems from db
        const request = await fetch("http://localhost:3000/data/problems", {cache: "no-store"});
        const problems = await request.json();

        return problems;
    }
    let problems: Object = await getProblems();

    return (
        <div>
            {Object.entries(problems).map(([key, obj]) => {
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
