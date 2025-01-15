import { uploadManager } from '../../upload-manager';
import { CliCommand } from '../cli-command';
import { ConfigSyncOptions } from './config-sync';
import { ConfigSyncCommandImpl } from './config-sync-impl';

export const configSyncCommand: CliCommand<ConfigSyncOptions> =
  new ConfigSyncCommandImpl(uploadManager);
