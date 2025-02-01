export interface ConfigurationValues {
  awsProfile: string;
}

export interface GlobalConfiguration {
  getConfiguration<K extends keyof ConfigurationValues>(
    config: K,
  ): ConfigurationValues[K] | undefined;
  setConfiguration<K extends keyof ConfigurationValues>(
    config: K,
    value: ConfigurationValues[K] | undefined,
  ): void;
}
