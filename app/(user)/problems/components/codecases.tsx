// RUN/TEST CASES COMPONENT //
// displays the run/test cases when the code is run and returned from the server
"use client";
import { LeftArrowIcon, RightArrowIcon } from "@/app/_components/globalstyle";
import { IProblemSubmissionIndividualResponse, ITabbedMenuEntry } from "@/app/types";
import React, { useState } from "react";

export default function CodeCases({ cases }: { cases: IProblemSubmissionIndividualResponse[] }) {
    const [currentViewingCase, updateCurrentViewingCase] = useState<number | null>(null);

    return (
        (currentViewingCase == null) ? 
        (<div className="w-full">
            {cases.map((currentCase: IProblemSubmissionIndividualResponse, index: number) => {
                // Set colors
                const COLOR: string = (currentCase.pass) ? "green-600" : "red-600";
                const TEXT_COLOR: string = `text-${COLOR}`;
                const BORDER_COLOR: string = `border-${COLOR}`;
                return (
                    <div className={`flex border-2 ${BORDER_COLOR} px-3 py-2 rounded-md hover:cursor-pointer`} onClick={(event: React.MouseEvent) => {event.preventDefault(); updateCurrentViewingCase(index)}} key={index}>
                        <span className={`${TEXT_COLOR} grow font-bold`}>Run Case</span>
                        <span className={`${TEXT_COLOR} grow`}>{(currentCase.pass) ? "PASS" : "FAILED"}</span>
                        <span><RightArrowIcon/></span>
                    </div>
                );
            })}
        </div>) :
        (<>
            <span className="hover:cursor-pointer" onClick={(event: React.MouseEvent) => {event.preventDefault(); updateCurrentViewingCase(null)}}><LeftArrowIcon/></span>
            <SpecificCase individualCase={cases[currentViewingCase]} />
        </>)
    );
}

function SpecificCase({ individualCase }: { individualCase: IProblemSubmissionIndividualResponse }) {
    return (
        <div>
            <div>Expected Output</div>
            <div>{individualCase.expected}</div>
            <div>Actual Output</div>
            <div>{individualCase.actual}</div>
        </div>
    );
}