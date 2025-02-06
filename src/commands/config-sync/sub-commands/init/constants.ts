export const CONFIG_DIR = 'config';

export const SUPPORTED_STORAGE_STRUCTURES = {
  dynamodb: {
    path: 'yourTableName/',
    file: 'youritem.json',
    data: '{"PK": "yourPartitionKey", "SK": "yourSortKey"}',
  },
  s3: {
    path: 'yourBucketName/path/to/your',
    file: 'file.ext',
    data: 'your file content',
  },
};
