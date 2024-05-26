// MANAGE PROBLEM COMPONENT //
// provides the template that is used to create/edit problems
import { button, cancelButton, foreground, inputBox, inputLabel, inputSectionLabel, primaryButton } from "@/app/_components/globalstyle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function ManageProblem({ action, name, description, points, submitButtonText }: { action: (form: FormData) => void, name: string, description: string, points: number, submitButtonText: string}) {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    return (
        <form action={action} className={`flex flex-col`}>
            <label className={`${inputSectionLabel}`} >Problem Details</label>
            <label className={`${inputLabel}`}>Name</label>
            <input name="problem-name" type="text" className={`${inputBox}`} defaultValue={name} />
            <label className={`${inputLabel}`}>Description</label>
            <textarea name="problem-desc" rows={2} className={`${inputBox} resize-none`} defaultValue={description} />
            <label className={`${inputLabel}`}>Points Value</label>
            <input name="problem-pts" type="number" className={`${inputBox}`} placeholder={"Points"} defaultValue={points} />
            <div className={`flex flex-row gap-4 mt-8 w-full`}>
                <input type="submit" className={`${button} ${primaryButton} uppercase w-full`} value={submitButtonText} />
                <button className={`${button} ${cancelButton} uppercase w-full`} onClick={() => ROUTER.replace("/admin/problems")}>Cancel</button>
            </div>
        </form>
    );
}