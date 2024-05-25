export default class CPPBridge {
    input: string;
    constructor(type: "calculation" | "fixed_recalculation", metaheuristic: "simulatedAnnealing");
    appendLine(line: any[] | any): void;
    processInput(): Promise<any>;
}
