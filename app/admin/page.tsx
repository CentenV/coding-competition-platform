// ADMINISTRATIVE PAGE //
// Used to manage all aspect of the system
"use client";

import { useRef } from "react";
import Header from "../_components/header";
import CreateNewProblem from "./problems/createproblem";
import ProblemList from "./problems/problemlist";
import { background, foreground } from "../_components/globalstyle";

// Page Component
export default function AdministrativePage() {
    // Header text
    let headerText: string = "Administrator Dashboard";

    return (
        <div>
            <Header title={headerText} />
            <div className="text-3xl"></div>
            <ProblemList />
            <CreateNewProblem />
        </div>
    );
}
