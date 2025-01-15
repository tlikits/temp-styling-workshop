export type UploadConfig = DynamoDBUploadConfig | S3UploadConfig;

export const ConfigStorage = {
  DynamoDB: 'dynamodb',
  S3: 's3',
};

export interface DynamoDBUploadConfig {
  type: 'dynamodb';
  table: string;
  filepath: string;
}

export interface S3UploadConfig {
  type: 's3';
  bucket: string;
  key: string;
  filepath: string;
}
