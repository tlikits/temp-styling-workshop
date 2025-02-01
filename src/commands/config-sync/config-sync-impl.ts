import { Command } from 'commander';
import { SyncCommand } from './sub-commands/sync/types';
import { ConfigSyncCommand } from './types';

export class ConfigSyncCommandImpl implements ConfigSyncCommand {
  constructor(private readonly syncCommand: SyncCommand) {}

  public install(program: Command): void {
    const command = program.command('config-sync');
    this.syncCommand.install(command);
  }
}
