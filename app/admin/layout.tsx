// ADMIN PAGE LAYOUT //

import { ReactElement } from "react";
import RootLayout from "../layout";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    let navbar:ReactElement = (<div>test</div>);

    return (
        <>
            {children}
        </>
    )
};