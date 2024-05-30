// ADMIN-SIDE LAYOUT //
// administrator zone general page layout
import React from "react";
import RootLayout from "../../layout";
import UniversalLayout from "../../_components/universal_layout";
import { IMenuOption } from "@/app/_components/menu_option";
import { HomeIcon, ProblemsIcon } from "@/app/_components/globalstyle";

// All menu options
const menuOptions: IMenuOption[] = [
    { text: "Dashboard", destinationURL: "/admin", icon: <HomeIcon /> },
    { text: "Problems", destinationURL: "/admin/problems", icon: <ProblemsIcon /> },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <UniversalLayout homeURL="/admin" options={menuOptions}>
            {children}
        </UniversalLayout>
    )
};