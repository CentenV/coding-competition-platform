// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems

import { foreground, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import Link from "next/link";
import { Router } from "next/router";

export default function ManageProblem({ action, name, description, points, submitButtonText }: { action: (form: FormData) => void, name: string, description: string, points: number, submitButtonText: string }) {
    return (
        <form action={action} className={`${foreground} flex flex-col`}>
            <label className={`${inputSectionLabel}`} >Problem Details</label>
            <label className={`${inputLabel}`}>Name</label>
            <input name="problem-name" type="text" className={`${inputBox}`} defaultValue={name} />
            <label className={`${inputLabel}`}>Description</label>
            <textarea name="problem-desc" rows={2} className={`${inputBox} resize-none`} defaultValue={description} />
            <label className={`${inputLabel}`}>Points Value</label>
            <input name="problem-pts" type="number" className={`${inputBox}`} placeholder={"Points"} defaultValue={points} />
            <div>
                <input type="submit" className={`${primaryButton}`} defaultValue={submitButtonText} />
                {/* <button type="button" className={`${primaryButton}`} onClick={() => Router.back()}>Cancel</button> */}
            </div>
        </form>
    );
}