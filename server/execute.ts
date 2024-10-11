// EXECUTION OF CODE IN DOCKER CONTAINERS //
// utility functions used to execute the user submitted code
import path from "path";
import { execSync } from "child_process";
import { writeFile, writeFileSync } from "fs";
// import { ExecuteError } from "@/app/types";

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
    protected outputFilePath: string;

    /**
     * Initialize the Execute object 
     * @param fileName The file name of the code file on disk. File extension is appended according to the language specified
     * @param codeLang 
     * @param code 
     */
    constructor(fileName: string, codeLang: Language, code: string) {
        this.fileName = fileName;
        this.outputFilePath = "";
        this.codeLanguage = codeLang;

        // Create and print out to code file
        this.codeFilePath = path.resolve(`${process.env.COMPETITION_SERVICE_DIR}/rawcode/${this.fileName}.py`);
        console.log("Code File: " + this.codeFilePath);
        writeFileSync(this.codeFilePath, code);
    }

    public abstract run(): string;
}


// Python
export class PythonExecute extends Execute {
    constructor(fileName: string, code: string) {
        super(fileName, Language.Python, code);
    }

    public run(): string {
        // Output file path
        this.outputFilePath = path.resolve(`${process.env.COMPETITION_SERVICE_DIR}/outputs/${this.fileName}.txt`);
        // console.log("Output path: " + this.outputFilePath);

        // Execute docker run creating a container and executing code. Outputs code output result to file
        let output: string = "";
        try {
            output = execSync(`docker run -v ${this.codeFilePath}:/exec/prog.py ccp-python`, { stdio: "pipe", encoding: "utf8" });
        }
        catch (error) {
            if (error != undefined) {
                const errorMsgSplit: string[] = error.toString().split("\n");
                for (let i = 1; i < errorMsgSplit.length; i++) {
                    output += `${errorMsgSplit[i]}\n`;
                }
            }
        }

        // Output code to file for later reference
        writeFileSync(this.outputFilePath, output);
        
        // Return output
        return output;
    }
}


// export async function runMultipleExecutes(tasks: Execute[]) {

// }