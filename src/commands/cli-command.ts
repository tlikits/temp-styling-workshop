import { Command } from 'commander';

export interface CliCommand<Options = any> {
  install(program: Command): void;
}
