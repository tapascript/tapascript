import ReadLines from "./readlines.js";
import ErrorHandler from "./error.js";
import { REPOSITORY } from "./const.js";
import child from "child_process";
import path from "path";
import fs from "fs";

const ErrorHander = new ErrorHandler();

class Command {
  rlReader: ReadLines;
  constructor(rlReader: ReadLines) {
    this.rlReader = rlReader;
  }
  cloner(repolink: string, projectName: string) {
    try {
      let command = `git clone ${repolink}`;
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
      if (!cloneDirectory?.trim().length) cloneDirectory = REPOSITORY.JS_BASE.defaultCloneFolder;
      this.cloner(REPOSITORY.JS_BASE.repoLink, cloneDirectory);
      console.log("\n Happy hacking");
      console.log("\n hit `npm run start`");
    } catch (err) {
      ErrorHander.handleExitError((err as Error)?.message);
    }
  }
  async create_react_base_vite() {
    try {
      let cloneDirectory = await this.rlReader.react_base_project_name();
      if (!cloneDirectory?.trim().length) cloneDirectory = REPOSITORY.REACT_BASE.defaultCloneFolder;
      this.cloner(REPOSITORY.REACT_BASE.repoLink, cloneDirectory);
      console.log("\n Happy hacking");
      console.log("\n hit `npm run dev`");
    } catch (err) {
      ErrorHander.handleExitError((err as Error)?.message);
    }
  }
}

export default Command;
