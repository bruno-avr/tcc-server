import { spawn } from "child_process";
import { writeFileSync } from 'fs';

export type cppBridgeTypes =
  | "generate"
  | "calculate_score"
  | "fixed_recalculation";

export type cppBridgeMetaheuristcs = "simulatedAnnealing";
export type cppBridgePerformanceMode = "fast" | "balanced" | "precision";

export default class CPPBridge {
  input: string;

  constructor(type: cppBridgeTypes, metaheuristic?: cppBridgeMetaheuristcs, performanceMode?: cppBridgePerformanceMode) {
    this.input = `${type}`
    if (metaheuristic && performanceMode) {
      this.input += ` ${metaheuristic} ${performanceMode}`;
    }
    this.input += "\n";
  }

  appendLine(line: any[] | any) {
    this.input += (Array.isArray(line) ? line.join(" ") : String(line)) + "\n";
  }

  async processInput() {
    const cpp = spawn("./bin/a.out");
    // console.log(this.input);
    // return this.input;
    writeFileSync('input.txt', this.input);
    cpp.stdin.write(this.input);
    cpp.stdin.end();

    let outputData = "";

    for await (const data of cpp.stdout) {
      outputData += data.toString();
    }

    try {
      return JSON.parse(outputData);
    } catch (error) {
      throw new Error("Erro interno na conversão da resposta.");
    }
  }
}
