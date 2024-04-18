// Create Problem Component  //
"use client";

export default function CreateNewProblem() {
    async function createProblem(newProblemData: FormData) {
        // Get data from form and format it
        const pName = String(newProblemData.get("problem-name"));
        const pDesc = String(newProblemData.get("problem-desc"));
        const pPts = Number(newProblemData.get("problem-pts"));
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
        <form action={createProblem} >
            <input name="problem-name" />
            <input name="problem-desc" />
            <input name="problem-pts" type="number" />
            <input type="submit" />
        </form>
    );
}
