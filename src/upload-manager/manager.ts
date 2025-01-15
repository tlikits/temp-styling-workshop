import { ConfigStorage, UploadConfig } from './interfaces';
import {
  dynamodbUploader,
  DynamoDBUploader,
  s3Uploader,
  S3Uploader,
  Uploader,
} from './uploader';

export interface UploadManager {
  setTargetPath(targetPath: string): void;
  upload(config: UploadConfig): Promise<void>;
  parseConfig(filepath: string): UploadConfig | undefined;
}

export class UploadManagerImpl implements UploadManager {
  private targetPath!: string;

  constructor() {}

  public setTargetPath(targetPath: string): void {
    this.targetPath = targetPath;
  }

  public parseConfig(filepath: string): UploadConfig | undefined {
    const [_, storage] = filepath.split('/');
    const uploader = this.getUploaderByStorageType(storage);
    return uploader?.parse(this.targetPath, filepath);
  }

  public async upload(config: UploadConfig): Promise<void> {
    const uploader = this.getUploader(config);
    if (!uploader) {
      console.warn('Invalid uploader');
      return;
    }
    return uploader.upload(config);
  }

  private getUploader(
    config: UploadConfig,
  ): Uploader<UploadConfig> | undefined {
    const { type } = config;
    switch (type) {
      case ConfigStorage.DynamoDB:
        return new DynamoDBUploader();
      case ConfigStorage.S3:
        return new S3Uploader();
      default:
        return;
    }
  }

  private getUploaderByStorageType(
    storageType: string,
  ): Uploader<UploadConfig> | undefined {
    switch (storageType) {
      case 'dynamodb':
        return dynamodbUploader;
      case 's3':
        return s3Uploader;
      default:
        return;
    }
  }
}

export const uploadManager: UploadManager = new UploadManagerImpl();
