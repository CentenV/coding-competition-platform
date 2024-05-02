// PROBLEM LIST PAGE //
// problem list management page found in the administrator page of the platform

import Header from "@/app/_components/header";
import ProblemList from "./problemlist";


// Page Component
export default function ProblemsPage() {
    let headerText: string = "Problems"

    return (
        <>
            <Header title={headerText} />
            <ProblemList />
        </>
    )
}