"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
async function cppBridge(input) {
    const cpp = (0, child_process_1.spawn)("./bin/a.out");
    cpp.stdin.write(input);
    cpp.stdin.end();
    let outputData = "";
    for await (const data of cpp.stdout) {
        outputData += data.toString();
    }
    return outputData;
}
exports.default = cppBridge;
//# sourceMappingURL=cppBridge.js.map