// CREATE PROBLEM PAGE //
"use client";
import Header from "@/app/_components/header";
import ManageProblem from "@/app/_components/problemmanagement";

export default function CreateNewProblem() {
    const PAGE_TITLE = "Create New Problem";

    async function createProblem(newProblemData: FormData) {
        // Get data from form and format it
        const pName = String(newProblemData.get("problem-name"));
        const pDesc = String(newProblemData.get("problem-desc"));
        const pPts = Number(newProblemData.get("problem-pts"));
        console.log(pName);
        console.log(pDesc);
        console.log(pPts);
        // Validate input

        const data = JSON.stringify({
            name: pName,
            description: pDesc,
            points: pPts
        });

        // Push to database
        const request = await fetch("http://localhost:3000/data/problems", {
            method: "POST",
            body: data
        });
    }

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <ManageProblem action={createProblem} name="" description="" points={10} submitButtonText="Create" />
        </div>
        
    );
}