// ADMINISTRATIVE PAGE //
// Used to manage all aspect of the system
"use client";
import toast from "react-hot-toast";
import Header from "../../_components/header";

// Page Component
export default function AdministrativePage() {
    // Header text
    let headerText: string = "Administrator Dashboard";

    return (
        <>
            <Header title={headerText} />
            <div className="text-3xl"></div>
            <button onClick={(event) => { event.preventDefault(); toast("hello world"); }}>Toast Test</button>
        </>
    );
}
