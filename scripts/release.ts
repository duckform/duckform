import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const byRoot = (...segs: string[]) => path.resolve(__dirname, "..", ...segs);
const args = process.argv.slice(2);

const version = args[0];
if (!version) {
  throw new Error(" publish version is requre ");
}

const pkgs = fs
  .readdirSync(byRoot("./packages"))
  .map((item) => byRoot("./packages", item))
  .filter((maybe) => fs.statSync(maybe).isDirectory());

for (const pkg of pkgs) {
  console.log("🚀 ~release pkg:", pkg);
  const pkgjson = fs
    .readFileSync(path.resolve(pkg, "package.json"), "utf-8")
    .toString();
  const backup = pkgjson;
  const fixdeps = pkgjson.replace(/workspace:\*/g, `^${version}`);
  const json = JSON.parse(fixdeps);

  json.version = version;

  fs.writeFileSync(
    path.resolve(pkg, "package.json"),
    JSON.stringify(json, null, 2),
    "utf-8",
  );

  try {
    execSync("npm publish", {
      cwd: pkg,
      stdio: "inherit",
    });
  } catch (error) {
    console.log("error", error);
  }

  fs.writeFileSync(path.resolve(pkg, "package.json"), backup, "utf-8");
}
