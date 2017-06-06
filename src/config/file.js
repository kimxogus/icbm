import * as fs from 'fs';

import { sync as mkdirpSync } from 'mkdirp';
import rc from 'rc';
import stringify from 'json-stable-stringify';
import { omit } from 'lodash';

import { validate } from './keys';
import { appName, appDir, configFile } from '../paths';

import defaultConfig from './defaultConfig.json';

export const get = (key: ?string): string | object => {
  const config = omit(rc(appName), ['_', 'config', 'configs']) || {
    ...defaultConfig,
  };

  return key ? config[key] : config;
};

export const set = (key: string, value: string | number): object => {
  mkdirpSync(appDir);

  const existingConfig: object = fs.existsSync(configFile)
    ? JSON.parse(fs.readFileSync(configFile))
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

  fs.writeFileSync(configFile, stringify(newConfig, { space: '  ' }));

  return newConfig;
};
