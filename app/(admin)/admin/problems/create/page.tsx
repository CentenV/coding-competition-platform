// NEW PROBLEM PAGE //
// page containing a form dedicated for creating new problems
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";
import ManageProblem, { Action } from "@/app/_components/manage_problem";

// Page Component
export default function CreateNewProblem() {
    const PAGE_TITLE: string = "Create New Problem";

    // Initial problem data
    let initialProblemData: IProblem = {
        id: -1,
        name: "",
        description: "",
        points: 10,
        expected_output: ""
    };

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <div className={`${foreground}`}>
                <ManageProblem actionType={Action.CREATE} problemData={initialProblemData} submitButtonText="Create" />
            </div>
        </div>
    );
}