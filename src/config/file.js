import * as fs from 'fs';
import os from 'os';
import { readJsonSync } from 'fs-extra';

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

export const getConfigs = (...keys: ?string): object => {
  const rcFile: object =
    os
      .type()
      .toLowerCase()
      .indexOf('windows') !== -1
      ? fs.existsSync(configFile) ? readJsonSync(configFile) : {}
      : rc(appName);
  const config: object = omit({ ...defaultConfig, ...rcFile }, [
    '_',
    'config',
    'configs',
  ]);

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

  const newConfig = omit(existingConfig, [key]);

  fs.writeFileSync(configFile, stringify(newConfig, { space: '  ' }));

  return newConfig;
};
