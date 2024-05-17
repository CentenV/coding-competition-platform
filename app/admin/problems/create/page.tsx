// NEW PROBLEM PAGE //
"use client";
import Header from "@/app/_components/header";
import ManageProblem from "@/app/_components/problemmanagement";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

// Page Component
export default function CreateNewProblem() {
    const PAGE_TITLE: string = "New Problem";

    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Function to create problem
    async function createProblem(newProblemData: FormData) {
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
        const request = await fetch("/data/problems", {
            method: "POST",
            body: data
        });

        // Redirect back to problem list if all successful
        ROUTER.replace("/admin/problems");
    }

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <ManageProblem action={createProblem} name="" description="" points={10} submitButtonText="Create" />
        </div>
    );
}