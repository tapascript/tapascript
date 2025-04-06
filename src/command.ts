import ReadLines from "./readlines.js";
import ErrorHandler from "./error.js";
import { REPOSITORY } from "./const.js";
import child from "child_process";
import path from "path";
import fs from "fs";
import { buildBranchName } from "./helper.js";
import chalk from "chalk";

const ErrorHander = new ErrorHandler();

class Command {
  rlReader: ReadLines;
  constructor(rlReader: ReadLines) {
    this.rlReader = rlReader;
  }
  cloner(repolink: string, projectName: string, branchName?: string) {
    try {
      const branch = branchName ?? "main";
      let command = `git clone -b ${branch} ${repolink}`;
      if (projectName) command += ` ${projectName}`;

      child.execSync(command, {
        stdio: "inherit",
      });

      const clonedPath = path.join(process.cwd(), projectName);
      fs.rmSync(path.join(clonedPath, ".git"), { force: true, recursive: true });
      console.log("npm installing....");
      child.execSync(`npm install`, { cwd: clonedPath });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  async create_js_base() {
    try {
      let cloneDirectory = await this.rlReader.js_base_project_name();
      const { JS_BASE } = REPOSITORY;
      if (!cloneDirectory?.trim().length) cloneDirectory = JS_BASE.defaultCloneFolder;

      const options = {
        [JS_BASE.branches.tailwind]: await this.rlReader.js_base_with_tailwind(),
      };

      this.rlReader.rl.close();
      const branchName = buildBranchName(options, JS_BASE.branches.main);

      console.log("\nyou have choosen");
      Object.entries(options).forEach((item) => {
        console.log(
          chalk.blueBright.bold(item[0]),
          chalk.blueBright.bold("-"),
          chalk.green.bold(item[1] ? "yes" : "no")
        );
      });

      this.cloner(JS_BASE.repoLink, cloneDirectory, branchName);

      console.log(chalk.greenBright("\n Happy hacking"));
      console.log("\n hit `npm run start`");
    } catch (err) {
      ErrorHander.handleExitError((err as Error)?.message);
    }
  }
  async create_react_base_vite() {
    try {
      let cloneDirectory = await this.rlReader.react_base_project_name();

      const { REACT_BASE } = REPOSITORY;

      if (!cloneDirectory?.trim().length) cloneDirectory = REACT_BASE.defaultCloneFolder;
      this.cloner(REACT_BASE.repoLink, cloneDirectory, REACT_BASE.branchs.main);

      console.log(chalk.greenBright("\n Happy hacking"));
      console.log("\n hit `npm run dev`");
    } catch (err) {
      ErrorHander.handleExitError((err as Error)?.message);
    }
  }
}

export default Command;
