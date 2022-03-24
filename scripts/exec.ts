/**
 * execute ../src/bin/*.ts files
 * ex) npm run exec -- start_consumer -> execute ./src/bin/start_consumer.ts
 */
import { spawn } from "child_process";
import path from "path";

const main = (target: string, args: string[]) => {
  const bin = path.join("src", "bin", `${target}.ts`);
  spawn(`ts-node ${bin} ${args.join(" ")}`, {
    stdio: "inherit",
    shell: true,
  });
};

const target = process.argv.slice(2)[0];
const args = process.argv.slice(3);

if (target) {
  main(target, args);
} else {
  console.error("No target.");
}
