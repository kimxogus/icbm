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
import { fileDir } from '../paths';

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

const addAction = (name: string, srcPach: string): responseType => {
  ensureFileSync(srcPach);
  const stat = fs.lstatSync(srcPach);
  if (stat.isSymbolicLink()) {
    return alreadyAdded;
  }
  const addedFilePath = path.join(fileDir, name);
  copySync(srcPach, addedFilePath);
  removeSync(srcPach);
  ensureSymlinkSync(addedFilePath, srcPach);
  return success;
};

export default (file: string, option: ?object): responseType => {
  mkdirpSync(fileDir);

  option = defaults(option, {
    path: null,
  });

  let srcPath = null;
  const homePath = getEnvVar('HOME');
  switch (file) {
    case 'bash_profile':
      srcPath = defaultTo(option.path, path.join(homePath, '.bash_profile'));
      break;
    case 'bashrc':
      srcPath = defaultTo(option.path, path.join(homePath, '.bashrc'));
      break;
    default:
      return unsupported;
  }
  return addAction(file, srcPath);
};
