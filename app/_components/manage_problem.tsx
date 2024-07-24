// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems
"use client";
import { button, cancelButton, deleteButton, foreground, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { IProblem, IProblemRunCase, ITabbedMenuEntry } from "@/app/types";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import VerticalTabbedMenu from "@/app/_components/vertical_tabbed_menu";
import toast from "react-hot-toast";
import LoadingUI from "./loading_ui";
import { resolve } from "path";

// Used to distinguish between problem editing or creation
export enum ManageProblemPageType {
    CREATE,
    UPDATE
}

export default function ManageProblem({ problemData, problemId, pageType }: { problemData: IProblem, problemId?: number, pageType: ManageProblemPageType }) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    // Mutation type for all Action types
    const createMutation = useMutation({
        mutationKey: [`create_${problemId}`],
        mutationFn: async (newProblemData: IProblem) => {
            // Call Rest API post to create new problem. Receives new problem id in return
            const { data } = await axios.post("/data/admin/problems", newProblemData); 
            return data as { new_problem_id: string };
        },     
        onSuccess: async (data: { new_problem_id: string }) => { 
            toast.success("Successfully created new problem");
            console.log(data.new_problem_id);
            ROUTER.push(`/admin/problems/${data.new_problem_id}`);
        },
        onError: () => { toast.error("Cannot new problem"); }
    });
    const updateMutation = useMutation({
        mutationKey: [`update_${problemId}`],
        mutationFn: async (updatedProblemData: IProblem) => { await axios.patch(`/data/admin/problems/${problemData.id}`, updatedProblemData); },      // Call Rest API patch to update problem
        onSuccess: () => { toast.success("Updated problem details"); },
        onError: () => { toast.error("Cannot update problem details"); }
    }); 
    const deleteMutation = useMutation({
        mutationKey: [`delete_${problemId}`], 
        mutationFn: async () => { await axios.delete(`/data/admin/problems/${problemData.id}`); }
    });
    
    // Fetching all the test and run cases for the problem
    const ADD_RUN_CASE_OPTION: ITabbedMenuEntry = { title: "Add Run Case", content: () => (<>new problem</>), key: "New" };
    const [runCases, updateRunCaseEntries] = useState<ITabbedMenuEntry[]>([ADD_RUN_CASE_OPTION]);
    const getRunCases = useQuery({ 
        queryKey: [`get_run_cases_${problemId}`],
        queryFn: async () => {
            const { data } = await axios.get(`/data/admin/problems/${problemId}/runcases`);
            console.log(data);
            return data as IProblemRunCase[];
        },
        enabled: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });
    // Fetching if page is of the update type
    useEffect(() => {
        if (pageType.valueOf() == ManageProblemPageType.UPDATE.valueOf()) {
            getRunCases.refetch();
        }
    }, []);
    // Assembly of run cases memoized
    const assembleRunCases = useMemo(() => {
        let newRunCaseLog: ITabbedMenuEntry[] = [];
        // Iterate and convert from data to UI
        if (getRunCases.data != undefined) {
            getRunCases.data.map((runCase: IProblemRunCase, index: number) => {
                newRunCaseLog.push({ title: `Run Case ${index + 1}`, content: () => (<ManageCase initialData={runCase} />), key: runCase.id.toString() })
            });
        }
        newRunCaseLog.push(ADD_RUN_CASE_OPTION);
        updateRunCaseEntries(newRunCaseLog);
    }, [getRunCases.data])
    
    // Delete problem
    async function deleteProblem(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        
        // Call mutation
        deleteMutation.mutate();
        
        // Redirect back to problem list if all successful
        ROUTER.replace("/admin/problems");
        toast.success(`Successfully deleted problem id: ${problemData.id}`);
    }
    
    // Form handler/hook
    const { register, handleSubmit } = useForm<IProblem>();
    
    // Action method to create/update probems from the form
    const action: SubmitHandler<IProblem> = (data: IProblem) => {
        // Call respective mutation
        switch (pageType) {
            case ManageProblemPageType.CREATE:
                // Push new problem to database
                createMutation.mutate(data);
                break;
            case ManageProblemPageType.UPDATE:
                // Push updates to problems to database
                updateMutation.mutate(data);
                console.log(updateMutation.data);
                break;
            default:
                throw "Invalid action type";
        }
    };

    
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
                <input type="submit" className={`${button} ${primaryButton} uppercase w-full mt-5`} value={(pageType.valueOf() == ManageProblemPageType.CREATE) ? "Create" : "Update"} />
            </form>
            {/* Evaluation */}
            { pageType.valueOf() == ManageProblemPageType.UPDATE.valueOf() && 
                <>
                    <label className={`${inputSectionLabel} mt-7`}>Evaluation</label>
                    <div className={`${inputLabel}`}>Run Cases</div>
                    {getRunCases.isLoading && <LoadingUI size={35} /> }
                    {getRunCases.isError && <div>Error occurred fetching the run cases</div>}
                    {!getRunCases.isLoading && !getRunCases.isError && <VerticalTabbedMenu tabs={runCases} /> }
                </>
            }
            {/* Page/Problem Controls */}
            <div className={`flex flex-row gap-4 mt-8 w-full`}>
                <button className={`${button} ${cancelButton} uppercase w-full`} onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    ROUTER.replace("/admin/problems");
                }}>Cancel</button>
                {pageType.valueOf() == ManageProblemPageType.UPDATE.valueOf() && <button className={`${button} ${deleteButton} uppercase w-full`} onClick={deleteProblem} >Delete</button>}
            </div>
        </div>
    );
}

function ManageCase({ initialData }: { initialData: IProblemRunCase }) {
    console.log(initialData);

    return (
        <form className={`w-full`}>
            <label>Input</label>
            <textarea className={`${inputBox} resize-none border-2 border-gray-400 w-full`} value={initialData.input}></textarea>
            <label>Expected Output</label>
            <textarea className={`${inputBox} resize-none border-2 border-gray-400 w-full`} value={initialData.input}></textarea>
        </form>
    );
}