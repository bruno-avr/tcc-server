export default class CPPBridge {
    input: string;
    constructor(type?: string, metaheuristic?: string);
    appendLine(line: any[] | any): void;
    processInput(): Promise<any>;
}
