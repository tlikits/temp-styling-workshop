import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { CONFIG_DIR, SUPPORTED_STORAGE_STRUCTURES } from './constants';
import { InitCommand } from './types';

export class InitCommandImpl implements InitCommand {
  private targetDir!: string;

  constructor() {}

  public install(program: Command): void {
    program
      .command('init')
      .description('Initialize the sync repository')
      .argument('[path]', 'target path to execute this command', '.')
      .action(this.run.bind(this));
  }

  private async run(targetPath: string): Promise<void> {
    try {
      console.log('RUNNING...');
      this.setTargetDirectory(targetPath)
        .createConfigDirectory()
        .createStorageDirectory();
    } catch (error: Error | any) {
      console.error('Error:', error.message);
    }
  }

  private setTargetDirectory(targetPath: string): this {
    this.targetDir = path.join(process.cwd(), targetPath);
    console.debug(`Target directory: ${this.targetDir}`);
    return this;
  }

  private createConfigDirectory(): this {
    console.debug(`Creating config directory at ${this.targetDir}`);
    const configDir = path.join(this.targetDir, CONFIG_DIR);
    if (fs.existsSync(configDir)) {
      throw new Error('Config directory already exists');
    }
    this.createDirectory(configDir);
    return this;
  }

  private createStorageDirectory(): this {
    console.debug(`Creating storage directory at ${this.targetDir}`);
    Object.entries(SUPPORTED_STORAGE_STRUCTURES).forEach(
      ([storage, structure]) => {
        const dir = path.join(
          this.targetDir,
          CONFIG_DIR,
          storage,
          structure.path,
        );
        this.createDirectory(dir);
        fs.writeFileSync(path.join(dir, structure.file), structure.data);
      },
    );
    return this;
  }

  private createDirectory(directory: string): void {
    fs.mkdirSync(directory, { recursive: true });
  }
}
