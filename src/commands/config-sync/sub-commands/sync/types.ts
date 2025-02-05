import { CliCommand } from '../../../cli-command';

export type SyncCommand = CliCommand<SyncOptions>;

export interface SyncOptions {
  awsProfile?: string;
}
