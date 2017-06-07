import * as fs from 'fs';

import { sync as mkdirpSync } from 'mkdirp';
import rc from 'rc';
import stringify from 'json-stable-stringify';
import { omit, pick } from 'lodash';

import { validate } from './keys';
import { appName, appDir, configFile } from '../paths';

import defaultConfig from './defaultConfig';

export const getConfig = (key: ?string): string | object => {
  const config = getConfigs(key);
  return key ? config[key] : config;
};

export const getConfigs = (...keys: ?string): string | object => {
  const config = omit(rc(appName), ['_', 'config', 'configs']) || {
    ...defaultConfig,
  };

  keys = keys.filter(k => !!k);

  return keys.length ? pick(config, keys) : config;
};

export const setConfig = (key: string, value: any): object => {
  mkdirpSync(appDir);

  const existingConfig: object = fs.existsSync(configFile)
    ? JSON.parse(fs.readFileSync(configFile))
    : {};

  // Convert
  value = (v => {
    if (!isNaN(+v)) return +v;
    switch (v) {
      case 'true':
        return true;
      case 'false':
        return false;
    }
    return v;
  })(value);

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

export const removeConfig = (key: string): object => {
  mkdirpSync(appDir);

  const existingConfig: object = fs.existsSync(configFile)
    ? JSON.parse(fs.readFileSync(configFile))
    : {};

  const { key, ...newConfig } = existingConfig;

  fs.writeFileSync(configFile, stringify(newConfig, { space: '  ' }));

  return newConfig;
};
