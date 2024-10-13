// EXECUTION OF CODE IN DOCKER CONTAINERS //
// utility functions used to execute the user submitted code
import path from "path";
import { exec } from "child_process";
import { writeFileSync } from "fs";
import util from "util";
import { writeFile } from "fs/promises";
// import { ExecuteError } from "@/app/types";

const exec_cmd = util.promisify(exec);

// Enum used for classifying program languages submitted
export enum Language {
    Python
}

/**
 * Abstract class from which all child classes (different languages) implement
 */
export abstract class Execute {
    protected fileName: string;
    private codeLanguage: Language;
    protected codeFilePath: string;
    protected stdoutFilePath: string;
    protected stderrorFilePath: string;

    /**
     * Initialize the Execute object 
     * @param fileName The file name of the code file on disk. File extension is appended according to the language specified
     * @param codeLang 
     * @param code 
     */
    constructor(fileName: string, codeLang: Language, code: string) {
        this.fileName = fileName;
        this.stdoutFilePath = path.resolve(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${this.fileName}.txt`);
        this.stderrorFilePath = path.resolve(`${process.env.COMPETITION_SERVICE_DIR}/errors/${this.fileName}_error.txt`);
        this.codeLanguage = codeLang;

        // Create and print out to code file
        this.codeFilePath = path.resolve(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${this.fileName}.py`);
        writeFileSync(this.codeFilePath, code);
    }

    public abstract run(): Promise<{ stdout: string, stderr: string }>;
}


// Python
export class PythonExecute extends Execute {
    constructor(fileName: string, code: string) {
        super(fileName, Language.Python, code);
    }

    public async run(): Promise<{ stdout: string, stderr: string }> {
        // Execute docker run creating a container and executing code. Outputs code output result to file
        let cmd_return: { stdout: string, stderr: string } = { stdout: "", stderr: "" };
        await exec_cmd(`docker run -v ${this.codeFilePath}:/exec/prog.py ccp-python`).then(async (value: { stdout: string, stderr: string }) => {
            const { stdout, stderr } = value;
            cmd_return = { stdout, stderr };
        }).catch((reason) => {
            cmd_return.stderr = reason.stderr;
        });
        
        // Output results
        await writeFile(this.stdoutFilePath, cmd_return.stdout).catch((reason) => { console.error(`Failed to output to ${this.stdoutFilePath}.txt: ${reason}`); });
        if (cmd_return.stderr !== "") { await writeFile(this.stderrorFilePath, cmd_return.stderr, { encoding: "utf8" }).catch((reason) => { console.error(`Failed to output to ${this.stderrorFilePath}.txt: ${reason}`); }) }
        
        // Return output
        return cmd_return;
    }
}


// export async function runMultipleExecutes(tasks: Execute[]) {

// }