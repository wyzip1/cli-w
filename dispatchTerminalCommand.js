#!/usr/bin/env node

const packageJson = require('./package.json');
const createFolder = require("./createFolder");
const program = require("commander");

program
  .command("react [name]")
  .action((args) => {
    createFolder({ createReact: args });
  });

program
  .command("vue [name]")
  .action((args) => {
    createFolder({ createVue: args });
  });

program
  .command("js [name]")
  .allowUnknownOption()
  .action((args) => {
    createFolder({ createJs: args });
  });

// commands
program.version(`w-cli v${packageJson.version}`);

program.parse(process.argv);