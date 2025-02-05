import { globalConfig } from '../../global-configuration';
import { uploadManager } from '../../upload-manager';
import { ConfigSyncCommandImpl } from './config-sync-impl';
import { syncCommand } from './sub-commands/sync';
import { ConfigSyncCommand } from './types';

export const configSyncCommand: ConfigSyncCommand = new ConfigSyncCommandImpl(
  syncCommand,
);
