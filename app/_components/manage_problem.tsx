// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems
"use client";
import { button, cancelButton, deleteButton, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { IProblem } from "./interfaces";
import React from "react";
import axios from "axios";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export enum Action {
    CREATE,
    UPDATE
}

export default function ManageProblem({ problemData, problemId, actionType, submitButtonText, deletable }: { problemData: IProblem, problemId?: number | undefined, actionType: Action, submitButtonText: string, deletable?: boolean | undefined }) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Mutation type for all Action types
    const createMutation = useMutation({
        mutationKey: [`create_${Date.now()}`],
        mutationFn: async (newProblemData: IProblem) => { await axios.post("/data/problems", newProblemData); }     // Call Rest API post to create new problem
    });
    const updateMutation = useMutation({
        mutationKey: [`update_${Date.now()}`],
        mutationFn: async (updatedProblemData: IProblem) => { await axios.patch(`/data/problems/${problemData.id}`, updatedProblemData); }      // Call Rest API patch to update problem
    }); 
    const deleteMutation = useMutation({
        mutationKey: [`delete_${problemId}_${Date.now()}`], 
        mutationFn: async () => { await axios.delete(`/data/problems/${problemData.id}`); }
    });

    // Action method to create/update probems from the form
    async function action(problemFormData: FormData) {
        // Get data from form and format it, preparing data for mutation
        const data: IProblem = {
            name: String(problemFormData.get("problem-name")),
            description: String(problemFormData.get("problem-desc")),
            points: Number(problemFormData.get("problem-pts")),
            expected_output: String(problemFormData.get("problem-expected-output"))
        };

        // Call respective mutation
        switch (actionType) {
            case Action.CREATE:
                // Push new problem to database
                createMutation.mutate(data); 
                break;
            case Action.UPDATE:
                // Push updates to problems to database
                updateMutation.mutate(data);
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
        
        // Call mutation
        if (deletable) {
            deleteMutation.mutate();
        }
        else {
            throw "Problem page marked deletable but deleteMutation was called";
        }

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