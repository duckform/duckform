import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const byRoot = (...segs: string[]) => path.resolve(__dirname, "..", ...segs);

const pkgs = fs
  .readdirSync(byRoot("./packages"))
  .map((item) => byRoot("./packages", item))
  .filter((maybe) => fs.statSync(maybe).isDirectory());

for (const pkg of pkgs) {
  console.log("🚀 ~ pkg:", pkg);
  // if (/settings-form/.test(pkg)) {
  execSync("rm -rf dist && bun run build ", { cwd: pkg, stdio: "inherit" });
  // }
}
