// GLOBAL STYLE //
// class names containing the TailwindCSS utility classes that is used repetitively and globally. Used to reduce redundency in element styling. Heroicons JSX for icons used globally in application

// Foundational elements
// export const background: string = "bg-white dark:bg-neutral-900";
export const background: string = "bg-white";
// export const foreground: string = "bg-neutral-200 dark:bg-stone-800 border-2 border-neutral-300 dark:border-neutral-950 p-4 rounded-md";
export const foreground: string = "bg-neutral-200 border-2 border-neutral-300 p-4 rounded-md";
export const foregroundAlternate: string = "bg-white border-2 border-neutral-300 p-4 rounded-md";
export const card: string = "";

// Text
// export const primaryTextColor: string = "text-black dark:text-white";
export const primaryTextColor: string = "text-black";
export const header: string = "font-bold text-2xl mt-1";
export const subHeader: string = "pb-2 text-base text-gray-600";

// Buttons
export const button: string = "text-base rounded-md px-4 py-2 border-2 hover:cursor-pointer transition-colors";
export const primaryButton: string = "border-black hover:bg-black hover:text-white";
export const cancelButton: string = "border-neutral-400 hover:bg-neutral-400 hover:text-white";
export const deleteButton: string = "border-red-500 hover:bg-red-500 hover:text-white";
export const menuButton: string = `${foreground}`;

// Input Boxes
export const inputSectionLabel: string = "font-bold text-lg";
export const inputLabel: string = "mt-2 mb-1 text-base";
export const inputBox: string = "text-sm p-3 rounded-md";

// Components
export const divider: string = "border-b-2 border-gray-500";

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
        <svg width="24px" strokeWidth="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M10 17L9.33334 17C8.22877 17 7.33334 16.1047 7.33334 15.0002C7.33334 14.3284 7.33334 13.6211 7.33333 13.1111C7.33333 12.5556 6 12 6 12C6 12 7.33333 11.4444 7.33334 10.8889C7.33334 10.4359 7.33334 9.70586 7.33334 8.99998C7.33334 7.89541 8.22877 7 9.33334 7L10 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 17L14.6667 17C15.7712 17 16.6667 16.1047 16.6667 15.0002C16.6667 14.3284 16.6667 13.6211 16.6667 13.1111C16.6667 12.5556 18 12 18 12C18 12 16.6667 11.4444 16.6667 10.8889C16.6667 10.4359 16.6667 9.70586 16.6667 8.99998C16.6667 7.89541 15.7712 7 14.6667 7L14 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
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
export function SandboxIcon() {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M20.5 16.7222L12.2914 12.1618C12.1102 12.0612 11.8898 12.0612 11.7086 12.1618L3.5 16.7222" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3.52844 7.29363L11.7086 11.8382C11.8898 11.9388 12.1102 11.9388 12.2914 11.8382L20.5 7.27783" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 3L12 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 19.5V22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
}