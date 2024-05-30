// INDIVIDUAL PROBLEM PAGE //
// user page dedicated for individual problems. contains the problem instructions, editor and output results

import Header from "@/app/_components/header";
import { IProblem } from "@/app/_components/interfaces";

export default function IndividualProblem({ params } : { params: { problemid: string } }) {
    const PROBLEM_ID = Number(params.problemid);


    
    return (
        <div>
            {/* <Header title={problemData.name} />     */}
            user problem page
        </div>
    );
}