// NEW PROBLEM PAGE //
// page containing a form dedicated for creating new problems
"use client";
import { foreground } from "@/app/_components/globalstyle";
import Header from "@/app/_components/header";
import { IProblem } from "@/app/types";
import ManageProblem, { ManageProblemPageType } from "@/app/_components/manage_problem";
import HeaderedContent from "@/app/_components/headered_content";

// Page Component
export default function CreateNewProblem() {
    const PAGE_TITLE: string = "Create New Problem";

    // Initial problem data
    let initialProblemData: IProblem = {
        id: -1,
        name: "",
        description: "",
        points: 10,
    };

    return (
        <HeaderedContent header={PAGE_TITLE}>
            <ManageProblem pageType={ManageProblemPageType.CREATE} problemData={initialProblemData} />
        </HeaderedContent>
    );
}