// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems
"use client";
import { button, cancelButton, deleteButton, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { IProblem } from "./interfaces";
import React from "react";

export enum Action {
    CREATE,
    UPDATE
}

export default function ManageProblem({ actionType, problemData, submitButtonText, deletable }: { actionType: Action, problemData: IProblem, submitButtonText: string, deletable?: boolean | undefined }) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Action method to create/update probems from the form
    let action: (form: FormData) => void = async (problemFormData: FormData) => {
        // Get data from form and format it
        const pName = String(problemFormData.get("problem-name"));
        const pDesc = String(problemFormData.get("problem-desc"));
        const pPts = Number(problemFormData.get("problem-pts"));
        const pExpectedOutput = String(problemFormData.get("problem-expected-output"))

        // Validate input

        // Prepare data for REST
        const data = JSON.stringify({
            name: pName,
            description: pDesc,
            points: pPts,
            expected_output: pExpectedOutput
        });

        // CRUD Operation
        let request = null;
        switch (actionType) {
            case Action.CREATE:
                // Push new problem to database
                request = await fetch("/data/problems", {
                    method: "POST",
                    body: data
                });
                break;
            case Action.UPDATE:
                // Push updates to problems to database
                request = await fetch(`/data/problems/${problemData.id}`, {
                    method: "PATCH",
                    body: data
                });
                break;
            default:
                throw "Invalid action type";
        }

        // Redirect back to problem list if all successful
        ROUTER.replace("/admin/problems");
    }

    // Delete problem
    async function deleteProblem(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        
        const request = await fetch(`/data/problems/${problemData.id}`, {
            method: "DELETE"
        })

        // Redirect back to problem list if all successful
        ROUTER.replace("/admin/problems");
    }

    return (
        <form action={action} className={`flex flex-col`}>
            <label className={`${inputSectionLabel}`} >Problem Details</label>
            <label className={`${inputLabel}`}>Name</label>
            <input name="problem-name" type="text" className={`${inputBox}`} defaultValue={problemData.name} />
            <label className={`${inputLabel}`}>Description</label>
            <textarea name="problem-desc" rows={2} className={`${inputBox} resize-none`} defaultValue={problemData.description} />
            <label className={`${inputLabel}`}>Points Value</label>
            <input name="problem-pts" type="number" className={`${inputBox}`} placeholder={"Points"} defaultValue={problemData.points} />
            <label className={`${inputLabel}`}>Expected Output</label>
            <textarea name="problem-expected-output" rows={4} className={`${inputBox} resize-none`} defaultValue={problemData.expected_output} />
            <div className={`flex flex-row gap-4 mt-8 w-full`}>
                <input type="submit" className={`${button} ${primaryButton} uppercase w-full`} value={submitButtonText} />
                <button className={`${button} ${cancelButton} uppercase w-full`} onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    ROUTER.replace("/admin/problems");
                }}>Cancel</button>
                {(deletable != undefined || deletable) && <button className={`${button} ${deleteButton} uppercase w-full`} onClick={deleteProblem} >Delete</button>}
            </div>
        </form>
    );
}