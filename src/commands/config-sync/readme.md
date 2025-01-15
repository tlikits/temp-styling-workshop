# Config Sync

## Features

- Synchronizes configuration files across multiple projects.
- Easy to use command-line interface.
- Supports various configuration formats.

## Usage

You need to prepare the different file, `diff.txt` on the project path that you provide to CLI.

Each of the line contain the relative path to configuration file based on the provided project path.

```
turtle-tools config-sync /path/to/project
```

The project should have the structure as following

```
/config # Level-0
  /dynamodb # Level-1: Defines the type of storage
    /table-name # Level-2: Defines the storage name (in this case, table name)
      /category # Level-3+: Any name - for grouping the configurations
        user-configuration.json
        system-configuration.json
        ...
      no-category-configuration.json
```
