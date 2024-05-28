"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class CPPBridge {
    constructor(type, metaheuristic) {
        if (metaheuristic)
            this.input = `${type} ${metaheuristic}\n`;
        else
            this.input = `${type}\n`;
    }
    appendLine(line) {
        this.input += (Array.isArray(line) ? line.join(" ") : String(line)) + "\n";
    }
    async processInput() {
        const cpp = (0, child_process_1.spawn)("./bin/a.out");
        cpp.stdin.write(this.input);
        cpp.stdin.end();
        let outputData = "";
        for await (const data of cpp.stdout) {
            outputData += data.toString();
        }
        try {
            return JSON.parse(outputData);
        }
        catch (error) {
            throw new Error("Erro interno na conversão da resposta.");
        }
    }
}
exports.default = CPPBridge;
//# sourceMappingURL=CPPBridge.js.map