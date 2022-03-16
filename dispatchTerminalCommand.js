#!/usr/bin/env node

const createFolder = require("./createFolder");
const program = require("commander");

program
  .command("crf")
  .allowUnknownOption()
  .option("-r, --create-react <folderName>")
  .option("-v, --create-vue <folderName>")
  .option("-j, --create-js <folderName>")
  .action((args) => {
    createFolder(args);
  });

// commands
program.version(`w-cli v${"1.0.0"}`);

program.parse(process.argv);