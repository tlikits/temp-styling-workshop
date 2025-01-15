import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import * as fs from 'fs';
import * as path from 'path';
import { DynamoDBUploadConfig } from '../interfaces';
import { Uploader } from './uploader';

export class DynamoDBUploader implements Uploader<DynamoDBUploadConfig> {
  public parse(targetpath: string, filepath: string): DynamoDBUploadConfig {
    const parsed = path.parse(filepath);
    const { dir } = parsed;
    const [_, __, storageName] = dir.split('/');
    const filePath = path.join(targetpath, filepath);
    return {
      type: 'dynamodb',
      table: storageName,
      filepath: filePath,
    };
  }

  public async upload(config: DynamoDBUploadConfig): Promise<void> {
    const { filepath } = config;
    console.log(`uploading to dynamodb: ${config.table} - ${filepath}`);

    // Configure AWS credentials
    const dynamoDB = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Read the file content
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const item = JSON.parse(fileContent);

    // Marshal the item
    const marshalledItem = marshall(item);

    const params = {
      TableName: config.table,
      Item: marshalledItem,
    };

    await dynamoDB.send(new PutItemCommand(params));
    console.log('Uploaded to DynamoDB');
  }
}
