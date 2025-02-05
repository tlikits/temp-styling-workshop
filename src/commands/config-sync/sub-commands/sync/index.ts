import { globalConfig } from '../../../../global-configuration';
import { uploadManager } from '../../../../upload-manager';
import { SyncCommandImpl } from './sync-impl';
import { SyncCommand } from './types';

export * from './sync-impl';

export const syncCommand: SyncCommand = new SyncCommandImpl(
  globalConfig,
  uploadManager,
);
