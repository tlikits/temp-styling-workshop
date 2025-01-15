import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { UploadManager } from '../../upload-manager';
import { CliCommand } from '../cli-command';
import { ConfigSyncOptions } from './config-sync';

export class ConfigSyncCommandImpl implements CliCommand<ConfigSyncOptions> {
  private targetPath!: string;

  constructor(private uploadManager: UploadManager) {}

  public install(program: Command): void {
    program
      .command('config-sync')
      .argument('[path]', 'target path to execute this command', '.')
      .action(this.run.bind(this));
  }
  private setTargetPath(str: string): void {
    if (path.isAbsolute(str)) {
      this.targetPath = str;
    } else {
      this.targetPath = path.join(process.cwd(), str);
    }
    this.uploadManager.setTargetPath(this.targetPath);
  }
  public async run(str: string, options: ConfigSyncOptions): Promise<void> {
    console.log('RUNNING...');
    this.setTargetPath(str);

    const diffFilePath = path.join(this.targetPath, 'diff.txt');
    const promises = fs
      .readFileSync(diffFilePath, 'utf-8')
      .split('\n')
      .map(this.uploadManager.parseConfig.bind(this.uploadManager))
      .filter((config) => config !== undefined)
      .map((config) => this.uploadManager.upload(config!));

    await Promise.all(promises);
  }
}
