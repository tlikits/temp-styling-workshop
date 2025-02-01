export interface ConfigSyncOptions {
  awsProfile?: string;
}

export interface SyncConfig {
  execution?: ExecutionConfig;
  uploader?: UploaderConfig;
}

export interface ExecutionConfig {
  version: number;
  path: string;
}

export interface UploaderConfig {
  version: number;
  dynamodb: DynamoDBUploaderConfig;
  s3: any;
}

export type DynamoDBUploaderConfig = {
  default: DynamoDBSyncConfig;
  tables: DynamoDBTablesConfig;
};

export interface DynamoDBTablesConfig {
  [key: string]: DynamoDBSyncConfig;
}

export interface DynamoDBSyncConfig {
  autoUpdate: DynamoDBAutoUpdate;
}

export interface DynamoDBAutoUpdate {
  createdAt: AutoUpdateConfig;
  updatedAt: AutoUpdateConfig;
}

export interface AutoUpdateConfig {
  activate: boolean;
  label: string;
}
