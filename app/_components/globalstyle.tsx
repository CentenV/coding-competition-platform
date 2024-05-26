// GLOBAL STYLE //
// class names containing the TailwindCSS utility classes that is used repetitively and globally. Used to reduce redundency in element styling. Heroicons JSX for icons used globally in application

// Foundational elements
// export const background: string = "bg-white dark:bg-neutral-900";
export const background: string = "bg-white";
// export const foreground: string = "bg-neutral-200 dark:bg-stone-800 border-2 border-neutral-300 dark:border-neutral-950 p-4 rounded-md";
export const foreground: string = "bg-neutral-200 border-2 border-neutral-300 p-4 rounded-md";
export const foregroundAlternate: string = "bg-white border-2 border-neutral-300 p-4 rounded-md";

// Text
// export const primaryTextColor: string = "text-black dark:text-white";
export const primaryTextColor: string = "text-black";

// Buttons
export const button: string = "text-base rounded-md px-4 py-2 border-2 hover:cursor-pointer transition-colors";
export const primaryButton: string = "border-neutral-400 hover:bg-black hover:text-white";
export const cancelButton: string = "border-red-500 hover:bg-red-500 hover:text-white";
export const menuButton: string = `${foreground}`;

// Input Boxes
export const inputSectionLabel: string = "font-bold text-lg";
export const inputLabel: string = "mt-2 text-base";
export const inputBox: string = "text-sm p-3 rounded-md";


// Icons
export function HomeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    );
}
export function ProblemsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
    );
}
export function AddIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}