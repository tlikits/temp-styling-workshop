import { globalConfig } from '../../global-configuration';
import {
  DynamoDBUploadConfig,
  S3UploadConfig,
  UploadConfig,
} from '../interfaces';
import { DynamoDBUploader } from './dynamodb-uploader';
import { S3Uploader } from './s3-uploader';
import { Uploader } from './uploader';

export * from './dynamodb-uploader';
export * from './s3-uploader';
export * from './uploader';

export const dynamodbUploader: Uploader<DynamoDBUploadConfig> =
  new DynamoDBUploader(globalConfig);
export const s3Uploader: Uploader<S3UploadConfig> = new S3Uploader(
  globalConfig,
);
