// ADMINISTRATIVE PAGE //
// Used to manage all aspect of the system

"use client";

import CreateNewProblem from "./problems/createproblem";
import ProblemList from "./problems/problemlist";


// Page Component
export default function AdministrativePage() {
    return (
        <div>
            admin page
            <ProblemList />
            <CreateNewProblem />
        </div>
    );
}
