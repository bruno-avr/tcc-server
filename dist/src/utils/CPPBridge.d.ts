export type cppBridgeTypes = "generate" | "calculate_score" | "fixed_recalculation";
export type cppBridgeMetaheuristcs = "simulatedAnnealing";
export type cppBridgePerformanceMode = "fast" | "balanced" | "precision";
export default class CPPBridge {
    input: string;
    constructor(type: cppBridgeTypes, metaheuristic?: cppBridgeMetaheuristcs, performanceMode?: cppBridgePerformanceMode);
    appendLine(line: any[] | any): void;
    processInput(): Promise<any>;
}
