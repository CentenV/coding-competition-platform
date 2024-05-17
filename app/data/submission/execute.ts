// EXECUTION OF CODE IN DOCKER CONTAINERS //
// utility functions used to execute the user submitted code
import { ExecException } from "child_process";
import { env } from "process";
import * as fs from "fs";
const execSync = require("child_process").execSync;

// Enum used for classifying program languages submitted
export enum Language {
    Python
}

// Abstract class from which all child classes (different languages) implement
export abstract class Execute {
    protected codeFileName: string;
    private codeLanguage: Language;
    protected codeFilePath: string;
    protected outputFilePath: string;

    constructor(fileName: string, codeLang: Language, code: string) {
        this.codeFileName = fileName;
        this.outputFilePath = "";
        this.codeLanguage = codeLang;

        // Create code file
        this.codeFilePath = `${env.COMPETITION_SERVICE_DIR}/rawcode/test.py`;
        fs.writeFileSync(this.codeFilePath, code);
    }

    public abstract run(): string;
}


export class PythonExecute extends Execute {
    constructor(fileName: string, code: string) {
        super(fileName, Language.Python, code);
    }

    public run(): string {
        // Output file path
        this.outputFilePath = `${env.COMPETITION_SERVICE_DIR}/outputs/output.txt`;

        // Execute docker run creating a container and executing code. Outputs code output result to file
        let output: string = "";
        try {
            output = execSync(`docker run -v ${this.codeFilePath}:/exec/test.py pythontest`, { stdio: "pipe", encoding: "utf8" });
        }
        catch (error) {
            if (error != undefined) {
                let errorMsgSplit: string[] = error.toString().split("\n");
                for (let i = 1; i < errorMsgSplit.length; i++) {
                    output += `${errorMsgSplit[i]}\n`;
                }
            }
        }

        // Output code to file for later reference
        fs.writeFileSync(this.outputFilePath, output);
        
        // Return output
        return output;
    }
}