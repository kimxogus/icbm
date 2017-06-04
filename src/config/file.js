import * as fs from 'fs';

import { sync as mkdirpSync } from 'mkdirp';
import rc from 'rc';
import stringify from 'json-stable-stringify';
import { get as lodashGet, omit } from 'lodash';

import { validate } from './keys';
import { appName, appDir, configFile } from '../paths';

export const get = (key: ?string): string | object => {
  const config = omit(rc(appName), ['_', 'config', 'configs']) || {};

  return key ? lodashGet(config, key) : config;
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
