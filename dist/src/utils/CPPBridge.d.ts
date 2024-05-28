export type cppBridgeTypes = "generate" | "calculate_score" | "fixed_recalculation";
export type cppBridgeMetaheuristcs = "simulatedAnnealing";
export default class CPPBridge {
    input: string;
    constructor(type: cppBridgeTypes, metaheuristic?: cppBridgeMetaheuristcs);
    appendLine(line: any[] | any): void;
    processInput(): Promise<any>;
}
