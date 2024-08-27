export type cppBridgeTypes = "generate" | "calculate_score" | "fixed_recalculation";
export type cppBridgeMetaheuristcs = "simulatedAnnealing";
export type cppBridgeExecutionSpeed = "fast" | "medium" | "slow";
export default class CPPBridge {
    input: string;
    constructor(type: cppBridgeTypes, metaheuristic?: cppBridgeMetaheuristcs, executionSpeed?: cppBridgeExecutionSpeed);
    appendLine(line: any[] | any): void;
    processInput(): Promise<any>;
}
