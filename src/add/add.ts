import * as path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import * as fs from 'fs';
import {
  copySync,
  ensureFileSync,
  ensureSymlinkSync,
  removeSync,
} from 'fs-extra';
import { defaultTo } from 'lodash';

import { appDir } from '../paths';
import * as config from '../config';

export enum AddResponseType {
  AlreadyAdded,
  Success,
  Fail,
  Unsupported,
}

export default (file: string, filePath?: string): AddResponseType => {
  mkdirpSync(appDir);

  let srcPath = null;
  const homePath = process.env.HOME || '';
  switch (file) {
    case 'config':
      return AddResponseType.Unsupported;

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
      if (!filePath) return AddResponseType.Unsupported;
      srcPath = filePath;
  }

  if (!srcPath) return AddResponseType.Fail;

  ensureFileSync(srcPath);

  if (fs.lstatSync(srcPath).isSymbolicLink()) {
    return AddResponseType.AlreadyAdded;
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

  return AddResponseType.Success;
};
