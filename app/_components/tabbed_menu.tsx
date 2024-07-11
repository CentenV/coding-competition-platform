// TABBED MENU COMPONENT //
// the tab/mini-page menu style where pages are navigated between using tabs
"use client";
import { ITabbedMenuEntry } from "@/app/types";
import { useState } from "react";

export default function TabbedMenu({ tabs }: { tabs: ITabbedMenuEntry[] }) {
    // State for new tabs to be dynamically added
    const [tabTitles, updateTabTitles] = useState<string[]>([]);
    

    return (
        <div>
            {/* Render all tabs */}
            {tabs.map((currentTab: ITabbedMenuEntry) => (
                <>
                    <div>
                        {currentTab.title}
                    </div>
                    <div>
                        {<currentTab.content />}
                    </div>
                </>
            ))}
        </div>
    );
}