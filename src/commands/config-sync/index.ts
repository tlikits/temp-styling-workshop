import { ConfigSyncCommandImpl } from './config-sync-impl';
import { initCommand } from './sub-commands/init';
import { syncCommand } from './sub-commands/sync';
import { ConfigSyncCommand } from './types';

export const configSyncCommand: ConfigSyncCommand = new ConfigSyncCommandImpl(
  initCommand,
  syncCommand,
);
