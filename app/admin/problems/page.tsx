// PROBLEMS PAGE //
// problem list management page found in the administrator page of the platform
"use client";
import Header from "@/app/_components/header";
import ProblemList from "./problemlist";
import Link from "next/link";
import { button, foreground, primaryButton } from "@/app/_components/globalstyle";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Page Component
export default function ProblemsPage() {
    // Next.JS Router
    const ROUTER: AppRouterInstance = useRouter();

    let PAGE_TITLE: string = "Problems";

    return (
        <div>
            <Header title={PAGE_TITLE} />
            <div className={`${foreground}`}>
                <div className={`mt-2 mb-5`}>
                    <button></button>
                    <Link href={"/admin/problems/create"} className={`${button} ${primaryButton} my-10`}>New</Link>
                </div>
                <ProblemList />
            </div>
        </div>
    )
}