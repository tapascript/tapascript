#!/usr/bin/env node
import { default as CommandService } from "./command.js";
import ReadLines from "./readlines.js";
import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ReadlinesInstance = new ReadLines(readlineInterface);
const Command = new CommandService(ReadlinesInstance);

function main() {
  const commands = Object.freeze({
    "js-base": Command.create_js_base.bind(Command),
  });

  const execCommand = process.argv?.length >= 3 ? process.argv[2] : null;

  if (!execCommand) {
    console.log("Please specify a command like", Object.keys(commands).join(", "));
    process.exit(1);
  }

  const actualCommandExecuter = commands[execCommand];

  if (!actualCommandExecuter) {
    console.log("Invalid Command. Please Specify from", Object.keys(commands).join(", "));
    process.exit(1);
  }

  actualCommandExecuter(process.argv.slice(3));
}

main();
