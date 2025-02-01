import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalConfiguration } from '../../global-configuration';
import { S3UploadConfig } from '../interfaces';
import { Uploader } from './uploader';

export class S3Uploader implements Uploader<S3UploadConfig> {
  private s3Client!: S3Client;

  constructor(private readonly globalConfig: GlobalConfiguration) {}

  public parse(targetpath: string, filepath: string): S3UploadConfig {
    const parsed = path.parse(filepath);
    const { dir } = parsed;
    const [_, __, storageName, ...key] = dir.split('/');
    const filePath = path.join(targetpath, filepath);
    return {
      type: 's3',
      bucket: storageName,
      key: [...key, parsed.base].join('/'),
      filepath: filePath,
    };
  }

  public async upload(config: S3UploadConfig): Promise<void> {
    this.ensureS3Client();
    const { filepath } = config;
    console.debug(`Uploading to s3: ${config.bucket} - ${filepath}`);

    const params = {
      Bucket: config.bucket,
      Key: config.key,
      Body: fs.readFileSync(filepath),
    };
    await this.s3Client.send(new PutObjectCommand(params));
    console.debug('Uploaded to S3');
  }

  public ensureS3Client(): void {
    if (this.s3Client) {
      return;
    }
    const awsProfile = this.globalConfig.getConfiguration('awsProfile');
    if (!awsProfile) {
      throw new Error('awsProfile is missing in the global configuration');
    }
    this.s3Client = new S3Client({
      profile: awsProfile,
    });
  }
}
