import { spawn } from "child_process";
import { writeFileSync } from 'fs';

export type cppBridgeTypes =
  | "generate"
  | "calculate_score"
  | "fixed_recalculation";

export type cppBridgeMetaheuristcs = "simulatedAnnealing";
export type cppBridgeExecutionSpeed = "fast" | "medium" | "slow";

export default class CPPBridge {
  input: string;

  constructor(type: cppBridgeTypes, metaheuristic?: cppBridgeMetaheuristcs, executionSpeed?: cppBridgeExecutionSpeed) {
    this.input = `${type}`
    if (metaheuristic && executionSpeed) {
      this.input += ` ${metaheuristic} ${executionSpeed}`;
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
