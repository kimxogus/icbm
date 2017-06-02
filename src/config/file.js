import * as fs from 'fs';
import path from 'path';

import { sync as mkdirpSync } from 'mkdirp';
import rc from 'rc';
import stringify from 'json-stable-stringify';
import { get as lodashGet, omit } from 'lodash';

import { anyConfig } from './type';
import { anyConfig } from './type';
import { getEnvVar } from '../util';

const appName: string = 'xo';
const configDir: string = path.join(getEnvVar('HOME'), `.${appName}`);
const configPath: string = path.join(configDir, 'config');

export const get = (key: ?string): string | anyConfig => {
  const config = omit(rc(appName), ['_', 'config', 'configs']) || {};

  return key ? lodashGet(config, key) : config;
};

export const set = (config: anyConfig): Promise<anyConfig> => {
  mkdirpSync(configDir);

  const existingConfig: anyConfig = fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath))
    : {};

  const newConfig: anyConfig = {
    ...existingConfig,
    ...config,
  };

  fs.writeFileSync(configPath, stringify(newConfig, { space: '  ' }));

  return Promise.resolve(newConfig);
};
