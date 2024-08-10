// TABBED MENU COMPONENT //
// the tab/mini-page menu style where pages are navigated between using tabs
"use client";
import { ITabbedMenuEntry } from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";
import { foregroundAlternate } from "./globalstyle";

export default function VerticalTabbedMenu({ tabs }: { tabs: ITabbedMenuEntry[] }) {
    // Keeping track of tabs so that they are dynamically added
    const [tabTitles, updateTabTitles] = useState<string[]>([]);
    // Tracking the active tab
    const [activeTab, updateActiveTab] = useState<number>(-1);

    // Getting current tab JSX
    const currentTab = useCallback(() => {
        // Selected tab
        if (activeTab != -1) {
            const TAB: ITabbedMenuEntry = tabs[activeTab];
            return <TAB.content />;
        }
        // Default, nothing is displayed
        else {
            return <></>;
        }
    }, [tabs, activeTab]);

    return (
        <div className={`grid grid-rows-[2fr] grid-cols-[30%_69%] gap-4 ${foregroundAlternate} h-64`}>
            {/* Render all tabs */}
            <div className={`flex flex-col w-full order-first border-r-2 pr-4 gap-3 overflow-scroll`}>
                {tabs.map((currentTab: ITabbedMenuEntry, index: number) => (
                    <div className={`hover:cursor-pointer border-2 border-black rounded-md px-3 py-2 mr-2 ${(activeTab == index) ? "bg-slate-300" : ""}`} onClick={(event: React.MouseEvent) => { event.preventDefault(); updateActiveTab(index); (currentTab.onTabClick ? currentTab.onTabClick() : null ) }} key={currentTab.key} >
                        {currentTab.title}
                    </div>
                ))}
            </div>
            <div className={`w-full order-last`}>
                {currentTab()}
            </div>
        </div>
    );
}