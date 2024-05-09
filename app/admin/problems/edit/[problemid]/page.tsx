// EDIT PROBLEM PAGE //
// dynamic route page that is used to manage a problem by dynamically passing in the problem id when passing it in the url
"use client";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import LoadingUI from "@/app/_components/loadingui";
import ManageProblem from "@/app/_components/problemmanagement";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProblem({ params }: { params: { problemid: string } }) {
    const PAGE_TITLE = "Edit Problem";
    const PROBLEM_ID = Number(params.problemid);

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Collection of problem data
    const [problem, updateProblem] = useState<IProblem>({} as IProblem);

    // Wait for data to be fetched and validate if any data has been changed
    useEffect(() => {
        const load = async () => {
            updateProblem(await getProblem(PROBLEM_ID));
        }
        load();
    }, []);

    // Function to modify problem
    async function modifyProblem(newProblemData: FormData) {
        // Get data from form and format it
        const pName = String(newProblemData.get("problem-name"));
        const pDesc = String(newProblemData.get("problem-desc"));
        const pPts = Number(newProblemData.get("problem-pts"));

        // Validate input

        // Prepare data for REST
        const data = JSON.stringify({
            name: pName,
            description: pDesc,
            points: pPts
        });

        // Push to database
        const request = await fetch(`http://localhost:3000/data/problems/${problem.id}`, {
            method: "PATCH",
            body: data
        });

        // Redirect back to problem list if all successful
        ROUTER.replace("/admin/problems");
    }

    return (
        <div>
            <Header title={PAGE_TITLE} />
                {(Object.keys(problem).length === 0) ? <LoadingUI /> :
                    <ManageProblem name={problem.name} description={problem.description} points={problem.points} action={modifyProblem} submitButtonText={"Update"} />
                }
        </div>
    )
}


// Get problem helper function
async function getProblem(id: number): Promise<IProblem> {
    // Query getting all problems from db
    const request = await fetch(`http://localhost:3000/data/problems/${id}`, { method: "GET", cache: "no-cache" });
    const problems = await request.json();

    return problems as IProblem;
}