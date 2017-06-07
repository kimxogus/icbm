import path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import fs from 'fs';
import {
  copySync,
  ensureFileSync,
  ensureSymlinkSync,
  removeSync,
} from 'fs-extra';
import { defaultTo, defaults } from 'lodash';

import getEnvVar from '../util/getEnvVar';
import { appDir } from '../paths';
import * as config from '../config';

const alreadyRemoved: string = 'alreadyRemoved';
const success: string = 'success';
const fail: string = 'fail';

export type responseType = alreadyRemoved | success | fail;

export const response = {
  alreadyRemoved,
  success,
  fail,
};

export default (file: string): responseType => {
  mkdirpSync(appDir);

  let srcPath = null;
  const homePath = getEnvVar('HOME');

  const configKey = `path.${file}`;
  const filePath = config.getConfig(configKey);

  if (!filePath) return alreadyRemoved;

  removeSync(filePath);
  copySync(path.join(appDir, file), filePath);
  removeSync(path.join(appDir, file));

  config.removeConfig(configKey);

  return success;
};
