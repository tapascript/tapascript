import readline from "readline";

class ReadLines {
  rl: readline.Interface;
  constructor(rl: readline.Interface) {
    this.rl = rl;
    rl.on("SIGINT", () => {
      console.log("\nYou exited...");
      process.exit(1);
    });
  }

  // JS-BASE
  async js_base_project_name(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`Enter your project name (default: js-base): `, (answer) => {
        resolve(answer);
      });
    });
  }
  // REACT BASE
  async react_base_project_name(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rl.question(`Enter your project name (default: react-base-vite): `, (answer) => {
        this.rl.close();
        resolve(answer);
      });
    });
  }
}

export default ReadLines;
