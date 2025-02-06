import { InitCommandImpl } from './init-impl';
import { InitCommand } from './types';

export * from './init-impl';

export const initCommand: InitCommand = new InitCommandImpl();
