#!/usr/bin/env node

import { Command } from 'commander';
import { CommandInstaller } from './commands/installer';
const { name, version } = require('../package.json');

function run() {
  const program = new Command();
  program.name(name).version(version);
  const installer = new CommandInstaller(program);
  installer.installCommands();
  program.parse();
}

run();
