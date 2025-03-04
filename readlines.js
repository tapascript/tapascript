import { resolve } from "path";
import readline from "readline";

class ReadLines {
  /**
   *
   * @param {readline.Interface} rl
   */
  constructor(rl) {
    this.rl = rl;
    rl.on("SIGINT", () => {
      console.log("\nYou exited...");
      process.exit(1);
    });
  }

  async js_base_project_name() {
    return new Promise((resolve) => {
      this.rl.question(`Enter your project name (default: js-base): `, (answer) => {
        console.log("Your answer is ", answer);
        this.rl.close();
        resolve(answer);
      });
    });
  }
}

export default ReadLines;
