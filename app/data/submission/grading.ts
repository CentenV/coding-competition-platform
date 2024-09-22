// GRADING OF CODE SUBMISSIONS //

import { PrismaClient } from "@prisma/client"
import { Execute } from "./execute";
import { ProblemGradingResult } from "@/app/types";

const PRISMA = new PrismaClient();

/**
 * Grade given a problem and 
 * 
 * @param problemId 
 * @param execution 
 * @returns 
 */
export async function gradeProblemSubmission(problemId: number, execution: Execute): ProblemGradingResult {
    // Retrieve the problem run and assess execution cases from the database
    // run
    const runCases = await PRISMA.execution_case.findMany({
        where: {
            problem_execution_case_xref: {
                every: {
                    problem_id: problemId,
                    reltype: "RUN"
                }
            }
        }
    });
    // assess
    const assessCases = await PRISMA.execution_case.findMany({
        where: {
            problem_execution_case_xref: {
                every: {
                    problem_id: problemId,
                    reltype: "ASSESS"
                }
            }
        }
    });

    // Iterate through every execution case and run
    // run
    


    return false;
}

