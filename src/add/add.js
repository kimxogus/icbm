// @flow
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

import getEnvVar from 'get-env-var';
import { appDir } from '../paths';
import * as config from '../config';

const alreadyAdded: string = 'alreadyAdded';
const success: string = 'success';
const fail: string = 'fail';
const unsupported: string = 'unsupported';

export type responseType = alreadyAdded | success | fail | unsupported;

export const response = {
  alreadyAdded,
  success,
  fail,
  unsupported,
};

export default (file: string, filePath: ?string): responseType => {
  mkdirpSync(appDir);

  let srcPath = null;
  const homePath = getEnvVar('HOME', '');
  switch (file) {
    case 'config':
      return unsupported;

    case 'bash_profile':
      srcPath = defaultTo(filePath, path.join(homePath, '.bash_profile'));
      break;

    case 'bashrc':
      srcPath = defaultTo(filePath, path.join(homePath, '.bashrc'));
      break;

    case 'vimrc':
      srcPath = defaultTo(filePath, path.join(homePath, '.vimrc'));
      break;

    case 'gitconfig':
      srcPath = defaultTo(filePath, path.join(homePath, '.gitconfig'));
      break;

    case 'zshrc':
      srcPath = defaultTo(filePath, path.join(homePath, '.zshrc'));
      break;

    default:
      if (!filePath) return unsupported;
      srcPath = filePath;
  }

  if (!srcPath) return fail;

  ensureFileSync(srcPath);

  if (fs.lstatSync(srcPath).isSymbolicLink()) {
    return alreadyAdded;
  }

  const addedFilePath = path.join(appDir, file);

  // replace original file with symlink
  if (config.getConfig('file.createBackup'))
    copySync(srcPath, `${srcPath}.bak`);
  copySync(srcPath, addedFilePath);
  removeSync(srcPath);
  ensureSymlinkSync(addedFilePath, srcPath);

  // add config
  config.setConfig(`path.${file}`, srcPath);

  return success;
};
