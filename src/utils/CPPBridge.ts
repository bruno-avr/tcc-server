import { spawn } from "child_process";

export default class CPPBridge {
  input: string;

  constructor(type = "calculation", metaheuristic = "simulatedAnnealing") {
    this.input = `${type} ${metaheuristic}\n`;
  }

  appendLine(line: any[] | any) {
    this.input += (Array.isArray(line) ? line.join(" ") : String(line)) + "\n";
  }

  async processInput() {
    const cpp = spawn("./bin/a.out");
    // console.log(this.input);
    // return this.input;
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
