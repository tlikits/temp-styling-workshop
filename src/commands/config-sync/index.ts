import { globalConfig } from '../../global-configuration';
import { uploadManager } from '../../upload-manager';
import { CliCommand } from '../cli-command';
import { ConfigSyncOptions } from './types';
import { ConfigSyncCommandImpl } from './config-sync-impl';

export const configSyncCommand: CliCommand<ConfigSyncOptions> =
  new ConfigSyncCommandImpl(globalConfig, uploadManager);
