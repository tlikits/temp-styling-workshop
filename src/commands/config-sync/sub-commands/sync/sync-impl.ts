import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { GlobalConfiguration } from '../../../../global-configuration';
import { UploadManager } from '../../../../upload-manager';
import { SyncCommand, SyncOptions } from './types';

export class SyncCommandImpl implements SyncCommand {
  private targetPath!: string;

  constructor(
    private readonly globalConfiguration: GlobalConfiguration,
    private readonly uploadManager: UploadManager,
  ) {}

  public install(program: Command): void {
    program
      .command('sync')
      .option('--aws-profile [awsProfile]', 'aws profile to use')
      .action(this.run.bind(this));
  }

  private async run(options: SyncOptions): Promise<void> {
    console.log('RUNNING...');
    this.globalConfiguration.setConfiguration('awsProfile', options.awsProfile);

    const diffFilePath = path.join(process.cwd(), 'diff.txt');
    this.uploadManager.setTargetPath(process.cwd());
    const promises = fs
      .readFileSync(diffFilePath, 'utf-8')
      .split('\n')
      .map(this.uploadManager.parseConfig.bind(this.uploadManager))
      .filter((config) => config !== undefined)
      .map((config) => this.uploadManager.upload(config!));

    await Promise.all(promises);
  }
}
