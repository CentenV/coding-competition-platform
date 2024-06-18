// HEADERED CONTENT LAYOUT //
// templated layout the content area with a header

import React from "react";
import Header from "./header";

export default function HeaderedContent({ children, header } : { children: React.ReactNode, header: string }) {
    return (
        <>
            <Header title={header} />
            {children}
        </>
    );
}