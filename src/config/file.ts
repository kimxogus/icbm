import * as fs from 'fs';
import * as os from 'os';
import { readJsonSync } from 'fs-extra';

import { sync as mkdirpSync } from 'mkdirp';
import { omit, pick } from 'lodash';

import stringify = require('json-stable-stringify');
import rc = require('rc');

import { validate } from './keys';
import { appName, appDir, configFile } from '../paths';

import defaultConfig from './defaultConfig';

export const getConfigs = (...keys: string[]): any => {
  const rcFile: any =
    os.type().toLowerCase().indexOf('windows') !== -1
      ? fs.existsSync(configFile)
        ? readJsonSync(configFile)
        : {}
      : rc(appName);
  const config: any = omit({ ...defaultConfig, ...rcFile }, [
    '_',
    'config',
    'configs',
  ]);

  keys = keys.filter(k => !!k);

  return keys.length ? pick(config, keys) : config;
};

export const getConfig = (key?: string): string | any => {
  const config = getConfigs(key);
  return key ? config[key] : config;
};

export const setConfig = (
  key: string,
  value: string | number | boolean
): any => {
  mkdirpSync(appDir);

  const existingConfig: any = fs.existsSync(configFile)
    ? readJsonSync(configFile)
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
    throw new Error(`Invalid key value pair { '${key}' : ${value} }`);

  const newConfig: { [k: string]: any } = {
    ...existingConfig,
    ...{ [key]: value },
  };

  fs.writeFileSync(configFile, stringify(newConfig, { space: '  ' }));

  return newConfig;
};

export const removeConfig = (key: string): any => {
  mkdirpSync(appDir);

  const existingConfig: any = fs.existsSync(configFile)
    ? readJsonSync(configFile)
    : {};

  const newConfig = omit(existingConfig, [key]);

  fs.writeFileSync(configFile, stringify(newConfig, { space: '  ' }));

  return newConfig;
};
