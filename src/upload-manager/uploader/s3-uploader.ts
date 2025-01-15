import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { S3UploadConfig } from '../interfaces';
import { Uploader } from './uploader';

export class S3Uploader implements Uploader<S3UploadConfig> {
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
    const { filepath } = config;

    console.log(`uploading to s3: ${config.bucket} - ${filepath}`);

    // Configure AWS credentials
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Bucket: config.bucket,
      Key: config.key,
      Body: fs.readFileSync(filepath),
    };
    await s3.send(new PutObjectCommand(params));
    console.log('Uploaded to S3');
  }
}
