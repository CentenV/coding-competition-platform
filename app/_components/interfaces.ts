// INTERFACES //
// defines the interfaces used for typing in Typescript where it is globally used

// Problems structure
export interface IProblem {
    id: number,
    name: string,
    description: string,
    points: number
}


// API Response Formats //
// Submission response
export interface ISubmissionResponse {
    output: string
}