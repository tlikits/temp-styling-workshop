import { Command } from 'commander';
import { InitCommand } from './sub-commands/init/types';
import { SyncCommand } from './sub-commands/sync/types';
import { ConfigSyncCommand } from './types';

export class ConfigSyncCommandImpl implements ConfigSyncCommand {
  constructor(
    private readonly initCommand: InitCommand,
    private readonly syncCommand: SyncCommand,
  ) {}

  public install(program: Command): void {
    const command = program.command('config-sync');
    this.initCommand.install(command);
    this.syncCommand.install(command);
  }
}
