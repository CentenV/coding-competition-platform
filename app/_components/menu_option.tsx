// UNIVERSAL MENU OPTION //
// 
"use client";
import { useRouter } from 'next/navigation'
import { ProblemsIcon, button, menuButton } from "./globalstyle";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { IMenuOption } from '../types';

// Menu option component
export default function UniversalMenuOption({ optionData }: { optionData: IMenuOption }) {
    // NextJS Router
    const ROUTER: AppRouterInstance = useRouter();

    return (
        <div className={`${button} ${menuButton} flex flex-row gap-3`} onClick={() => { ROUTER.push(optionData.destinationURL) }}>
            <span>{optionData.icon}</span>
            <span>{optionData.text}</span>
        </div>
    );
}