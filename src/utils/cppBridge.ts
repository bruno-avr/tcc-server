import { spawn } from "child_process";

async function cppBridge(input: string) {
  const cpp = spawn("./bin/a.out");
  cpp.stdin.write(input);
  cpp.stdin.end();

  let outputData = "";

  for await (const data of cpp.stdout) {
    outputData += data.toString();
  }

  return outputData;
}

export default cppBridge;
