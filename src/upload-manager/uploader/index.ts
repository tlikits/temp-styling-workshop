import { UploadConfig } from '../interfaces';
import { DynamoDBUploader } from './dynamodb-uploader';
import { S3Uploader } from './s3-uploader';
import { Uploader } from './uploader';

export * from './dynamodb-uploader';
export * from './s3-uploader';
export * from './uploader';

export const dynamodbUploader: Uploader<UploadConfig> = new DynamoDBUploader();
export const s3Uploader: Uploader<UploadConfig> = new S3Uploader();
