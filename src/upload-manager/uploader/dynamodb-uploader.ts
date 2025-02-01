import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalConfiguration } from '../../global-configuration/global-configuration';
import { DynamoDBUploadConfig } from '../interfaces';
import { Uploader } from './uploader';

export class DynamoDBUploader implements Uploader<DynamoDBUploadConfig> {
  private dynamoDBClient!: DynamoDBClient;

  constructor(private readonly globalConfig: GlobalConfiguration) {}

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
    this.ensureDynamoDBClient();
    const { filepath } = config;
    console.debug(`Uploading to dynamodb: ${config.table} - ${filepath}`);

    // Read the file content
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const item = JSON.parse(fileContent);

    // Marshal the item
    const marshalledItem = marshall(item);

    const params = {
      TableName: config.table,
      Item: marshalledItem,
    };

    await this.dynamoDBClient.send(new PutItemCommand(params));
    console.debug('Uploaded to DynamoDB');
  }

  private ensureDynamoDBClient(): void {
    if (this.dynamoDBClient) {
      return;
    }
    const awsProfile = this.globalConfig.getConfiguration('awsProfile');
    if (!awsProfile) {
      throw new Error('awsProfile is missing in the global configuration');
    }
    this.dynamoDBClient = new DynamoDBClient({
      profile: awsProfile,
    });
  }
}
