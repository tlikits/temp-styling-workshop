import { Command } from 'commander';

export interface CliCommand<Options> {
  install(program: Command): void;
  run(str: string, options: Options): Promise<void>;
}
