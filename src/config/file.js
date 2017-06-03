import * as fs from 'fs';
import path from 'path';

import { sync as mkdirpSync } from 'mkdirp';
import rc from 'rc';
import stringify from 'json-stable-stringify';
import { get as lodashGet, omit } from 'lodash';

import { validate } from './keys';
import { getEnvVar } from '../util';

const appName: string = 'xo';
const configDir: string = path.join(getEnvVar('HOME'), `.${appName}`);
const configPath: string = path.join(configDir, 'config');

export const get = (key: ?string): string | object => {
  const config = omit(rc(appName), ['_', 'config', 'configs']) || {};

  return key ? lodashGet(config, key) : config;
};

export const set = (key: string, value: string | number): object => {
  mkdirpSync(configDir);

  const existingConfig: object = fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath))
    : {};

  if (!validate(key, value))
    throw new Error(
      `Invalid key value pair { '${key}' : ${value} }`,
      'Validation Error'
    );

  const newConfig: object = {
    ...existingConfig,
    ...{ [key]: value },
  };

  fs.writeFileSync(configPath, stringify(newConfig, { space: '  ' }));

  return newConfig;
};
