import { Command } from 'commander';
import { configSyncCommand } from './config-sync';
import { CliCommand } from './cli-command';

export class CommandInstaller {
  private commandList: CliCommand<unknown>[] = [configSyncCommand];

  constructor(private readonly program: Command) {}

  public installCommands(): void {
    this.commandList.forEach((command) => command.install(this.program));
  }
}
