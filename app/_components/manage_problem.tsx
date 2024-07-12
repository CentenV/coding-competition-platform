// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems
"use client";
import { button, cancelButton, deleteButton, foreground, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { IProblem, ITabbedMenuEntry } from "@/app/types";
import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import VerticalTabbedMenu from "@/app/_components/vertical_tabbed_menu";

export enum Action {
    CREATE,
    UPDATE
}

export default function ManageProblem({ problemData, problemId, actionType, submitButtonText, deletable }: { problemData: IProblem, problemId?: number | undefined, actionType: Action, submitButtonText: string, deletable?: boolean | undefined }) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Form handler/hook
    const { register, handleSubmit } = useForm<IProblem>();

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
    const action: SubmitHandler<IProblem> = ((data: IProblem) => {
        // Call respective mutation
        switch (actionType) {
            case Action.CREATE:
                // Push new problem to database
                createMutation.mutate(data);
                // TODO: Check for success
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
    });

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

    // Adding new case option

    // TODO: remove
    let testCases: ITabbedMenuEntry[] = [{ title: "Add Run Case", content: () => (<ManageCase/>) }];

    return (
        <div className={`${foreground} flex flex-col overflow-scroll`}>
            <form onSubmit={handleSubmit(action)} className={`flex flex-col`}>
                <label className={`${inputSectionLabel}`}>Problem Details</label>
                <label className={`${inputLabel}`}>Name</label>
                <input {...register("name")} type="text" className={`${inputBox}`} defaultValue={problemData.name} />
                <label className={`${inputLabel}`}>Description</label>
                <textarea {...register("description")} rows={2} className={`${inputBox} resize-none`} defaultValue={problemData.description} />
                <label className={`${inputLabel}`}>Points Value</label>
                <input {...register("points", { valueAsNumber: true })} type="number" className={`${inputBox}`} placeholder={"Points"} defaultValue={problemData.points} />
                {/* Evaluation */}
                <label className={`${inputSectionLabel} mt-7`}>Evaluation</label>
                <label className={`${inputLabel}`}>Run Cases</label>
                <VerticalTabbedMenu tabs={testCases} />
                <input type="submit" className={`${button} ${primaryButton} uppercase w-full`} value={submitButtonText} />
            </form>
            {/* Page/Problem Controls */}
            <div className={`flex flex-row gap-4 mt-8 w-full`}>
                <button className={`${button} ${cancelButton} uppercase w-full`} onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    ROUTER.replace("/admin/problems");
                }}>Cancel</button>
                {(deletable != undefined || deletable) && <button className={`${button} ${deleteButton} uppercase w-full`} onClick={deleteProblem} >Delete</button>}
            </div>
        </div>
    );
}

function ManageCase() {
    return (
        <div className={`w-full`}>
            <textarea className={`${inputBox} resize-none border-2 border-gray-400 w-full`}></textarea>
        </div>
    );
}