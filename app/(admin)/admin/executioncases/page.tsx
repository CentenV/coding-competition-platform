"use client";

import LoadingUI from "@/app/_components/loading_ui";
import { IExecutionCase } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ExecutionCasesPage() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["executioncases", "fetch"],
        queryFn: async () => {
            const { data } = await axios.get("/data/admin/executioncases");
            return data as IExecutionCase[];
        }
    });

    return (
        <>
            <div>Execution Cases page</div>
            {isLoading && <LoadingUI size={40} />}
            {data != undefined ? data.forEach((currentExecCase) => {
                console.log(currentExecCase);
                return (<div>
                    {/* <span>{currentExecCase.id}</span> */}
                    <div>{currentExecCase.problem_id}</div>
                    <div>{currentExecCase.input}</div>
                    <div>{currentExecCase.output}</div>
                    <div>{currentExecCase.hidden}</div>
                </div>);
            }) : null }
        </>
    );
}