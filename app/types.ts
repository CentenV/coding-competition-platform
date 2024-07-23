// TYPES //
// defines the interfaces used for typing in Typescript where it is globally used

// Frontend Data Component Formatting //
// menu options interface for passing in as parameter
export interface IMenuOption {
    text: string,
    destinationURL: string,
    icon: JSX.Element
}
export interface ITabbedMenuEntry {
    title: string,
    content: React.FC,
}

// Backend Data Formatting //
// problems structure for client- partial data exposed
// export interface IProblemPartial {
//     id: number,
// }t 
// problems structure for management - full data exposed
export interface IProblem {
    id?: number,
    name: string,
    description: string,
    points: number,
    expected_output: string,
    run_cases: IProblemRunCase[]
}
// 
export interface IProblemRunCase {
    id: number,
    problem_id: number,
    input: string,
    output: string,
    hidden: boolean
}

// API Response Formats //
// Authentication (Login)
// auth login requests
export interface ILogin {
    id: string,
    password: string,
}
// storing session id in server memory
export interface ISessionId {
    userId: string,
    sessionId: string,
    lastResponse: number,
}
// Submissions
// data types
export enum SubmissionLanguage {
    PYTHON
}
export enum CodeCaseSubmissionType {
    RUN, TEST
}
// general code (no problem associated)
export interface ISandboxSubmissionRequest {
    code: string,
    language: SubmissionLanguage,
}
export interface ISandboxSubmissionResponse {
    output: string
}
// individual problem
export interface IProblemSubmissionRequest {
    problemId: number,
    code: string,
    language: SubmissionLanguage,
}
export interface IProblemSubmissionResponse {
    pass: boolean,
    expected: string | null,
    actual: string | null,
    hidden: boolean,
    type: CodeCaseSubmissionType,
}