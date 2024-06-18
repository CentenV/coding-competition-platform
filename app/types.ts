// TYPES //
// defines the interfaces used for typing in Typescript where it is globally used

// Frontend Data Component Formatting //
// menu options interface for passing in as parameter
export interface IMenuOption {
    text: string,
    destinationURL: string,
    icon: JSX.Element
}

// Backend Data Formatting //
// problems structure for client- partial data exposed
// export interface IProblemPartial {
//     id: number,
// }
// problems structure for management - full data exposed
export interface IProblem {
    id?: number,
    name: string,
    description: string,
    points: number,
    expected_output: string
}

// API Response Formats //
// Submission response
export interface ISubmissionResponse {
    output: string
}