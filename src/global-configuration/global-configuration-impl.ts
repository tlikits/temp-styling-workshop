import {
  ConfigurationValues,
  GlobalConfiguration,
} from './global-configuration';

export class GlobalConfigurationImpl implements GlobalConfiguration {
  private configurationMap: Partial<ConfigurationValues> = {};

  public getConfiguration<K extends keyof ConfigurationValues>(
    config: K,
  ): ConfigurationValues[K] | undefined {
    return this.configurationMap[config];
  }
  public setConfiguration<K extends keyof ConfigurationValues>(
    config: K,
    value: ConfigurationValues[K] | undefined,
  ): void {
    if (value === undefined) {
      delete this.configurationMap[config];
      return;
    }
    if (
      this.configurationMap[config] !== undefined &&
      typeof value !== typeof this.configurationMap[config]
    ) {
      throw new Error(`Type mismatch for configuration key ${config}`);
    }
    this.configurationMap[config] = value;
  }
}
