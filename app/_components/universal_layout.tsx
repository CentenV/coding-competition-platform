// UNIVERSAL LAYOUT COMPONENT //
// provides a template that the admin and user pages relies on
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { foreground } from "./globalstyle";
import UniversalMenuOption, { IMenuOption } from "./menu_option";

export default function UniversalLayout({ children, homeURL, options }: { children: React.ReactNode, homeURL: string, options?: IMenuOption[] | undefined }) {
    return (
        <>
            <nav className={"order-first basis-64 flex flex-col flex-none flex gap-y-3"}>
                {/* ` dark:invert` */}
                <Link href={homeURL} className={`${foreground}`}><Image className={`invert-0`} src={"/default/default_logo.png"} alt="Logo" width={873} height={476} priority /></Link>
                {(options != undefined) ? options.map((data: IMenuOption, index: number) => {
                    return <UniversalMenuOption optionData={data} key={index} />;
                }) : null}
            </nav>
            <div className={"order-last basis-full ml-4 flex-auto"}>
                {children}
            </div>
        </>
    );
}