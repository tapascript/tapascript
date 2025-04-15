#!/usr/bin/env node
import { default as CommandService } from "./command.js";
import ReadLines from "./readlines.js";
import readline from "readline";
import { TJsBaseCommand } from "./types.js";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ReadlinesInstance = new ReadLines(readlineInterface);
const Command = new CommandService(ReadlinesInstance);

function main() {
  const commands = Object.freeze({
    "js-base": Command.create_js_base.bind(Command),
    "react-base": Command.create_react_base_vite.bind(Command),
  });

  const execCommand = process.argv?.length >= 3 ? process.argv[2] : null;

  if (!execCommand) {
    console.log("Please specify a command like", Object.keys(commands).join(", "));
    process.exit(1);
  }

  const actualCommandExecuter = commands[execCommand as keyof typeof commands];

  if (!actualCommandExecuter) {
    console.log("Invalid Command. Please Specify from", Object.keys(commands).join(", "));
    process.exit(1);
  }

  const lastArgument = process.argv[3] as TJsBaseCommand;
  actualCommandExecuter(lastArgument);
}

main();
