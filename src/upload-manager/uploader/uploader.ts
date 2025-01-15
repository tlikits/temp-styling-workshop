import { UploadConfig } from '../interfaces';

export interface Uploader<Config extends UploadConfig> {
  upload(config: Config): Promise<void>;
  parse(targetpath: string, filepath: string): Config;
}
