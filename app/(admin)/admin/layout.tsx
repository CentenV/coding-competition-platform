// ADMIN-SIDE LAYOUT //
// administrator zone general page layout
import React from "react";
import RootLayout from "../../layout";
import UniversalLayout from "../../_components/universal_layout";
import { IMenuOption } from "@/app/types";
import { ExecutionCaseIcon, HomeIcon, ProblemsIcon } from "@/app/_components/globalstyle";

// All menu options
const menuOptions: IMenuOption[] = [
    { text: "Dashboard", destinationURL: "/admin", icon: <HomeIcon /> },
    { text: "Problems", destinationURL: "/admin/problems", icon: <ProblemsIcon /> },
    { text: "Execution Cases", destinationURL: "/admin/executioncases", icon: <ExecutionCaseIcon /> },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <UniversalLayout homeURL="/admin" options={menuOptions}>
            {children}
        </UniversalLayout>
    )
};