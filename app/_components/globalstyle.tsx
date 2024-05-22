// GLOBAL STYLE //
// class names containing the TailwindCSS utility classes that is used repetitively and globally. Used to reduce redundency in element styling

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
export const primaryButton: string = " border-neutral-400 hover:bg-black hover:text-white";
export const cancelButton: string = " border-red-500 hover:bg-red-500 hover:text-white";

// Input Boxes
export const inputSectionLabel: string = "font-bold text-lg";
export const inputLabel: string = "mt-2 text-base";
export const inputBox: string = "text-sm p-3 rounded-md";