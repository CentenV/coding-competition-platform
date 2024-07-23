// AUTHENTICATION (LOGIN) PAGE //
// login page for the competition platform - hub of all authorization
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/app/types";

export default function AuthenticationPage() {
    // React hook form for handling login form
    const { register, handleSubmit } = useForm<ILogin>();
    // Form submit
    const loginHandler: SubmitHandler<ILogin> = (formData: ILogin) => {
        // TODO: implement hashing
        mutate(formData);
    }

    // Cookie store

    // Querying for login
    const { data, isSuccess, isError, isPending, error, mutate,  } = useMutation({
        mutationKey: ["loginAuth"],
        mutationFn: async (inputtedLoginFormData: ILogin) => {
            console.log("called")
            const { data } = await axios.post("/auth", inputtedLoginFormData);
            return data;
        },
    });

    return (
        <>
            <form onSubmit={handleSubmit(loginHandler)}>
                <input {...register("id", { required: true })} type="text" className="border-2" />
                <input {...register("password", { required: true })} type="password" className="border-2" />
                <input type="submit" value={"Login"} />
            </form>
            {isError && <div>Invalid Credentials</div>}
            {isSuccess && <div>{document.cookie}</div>}
        </>
    );
}