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

export default (file: string, option: ?object): responseType => {
  mkdirpSync(appDir);

  option = defaults(option, {
    path: null,
  });

  let srcPath = null;
  const homePath = getEnvVar('HOME');
  switch (file) {
    case 'config':
      return unsupported;

    case 'bash_profile':
      srcPath = defaultTo(option.path, path.join(homePath, '.bash_profile'));
      break;

    case 'bashrc':
      srcPath = defaultTo(option.path, path.join(homePath, '.bashrc'));
      break;

    case 'vimrc':
      srcPath = defaultTo(option.path, path.join(homePath, '.vimrc'));
      break;

    case 'gitconfig':
      srcPath = defaultTo(option.path, path.join(homePath, '.gitconfig'));
      break;

    default:
      if (!option.path) return unsupported;
      srcPath = option.path;
  }

  if (!srcPath) return fail;

  ensureFileSync(srcPath);

  if (fs.lstatSync(srcPath).isSymbolicLink()) {
    return alreadyAdded;
  }

  const addedFilePath = path.join(appDir, `.${file}`);

  // replace original file with symlink
  copySync(srcPath, addedFilePath);
  copySync(srcPath, `${srcPath}.bak`);
  removeSync(srcPath);
  ensureSymlinkSync(addedFilePath, srcPath);

  // add config
  config.set(`path.${file}`, srcPath);

  return success;
};
