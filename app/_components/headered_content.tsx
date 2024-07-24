// HEADERED CONTENT LAYOUT //
// templated layout the content area with a header

import React from "react";
import Header from "./header";

export default function HeaderedContent({ children, header } : { children: React.ReactNode, header: string }) {
    return (
        <div className={`flex flex-col gap-3 overflow-scroll`}>
            <Header title={header} />
            {children}
        </div>
    );
}