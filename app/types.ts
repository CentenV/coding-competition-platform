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
    key: string,
    onTabClick?: Function,
}

// Backend Data Formatting //
// problems
export interface IProblem {
    id?: number,
    name: string,
    description: string,
    points: number,
}
// execution case
export interface IExecutionCase {
    id?: number,
    input: string,
    output: string,
    hidden: boolean
}
// problem execution xref/link
export interface IProblemExecutionCase {
    id?: number,
    problem_id: number,
    execution_case_id: number,
    reltype: "RUN" | "ASSESS",
    hidden: boolean
}

// API Response Formats //
// Submissions
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