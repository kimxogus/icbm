import path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import fs from 'fs';
import {
  copySync,
  ensureFileSync,
  ensureSymlinkSync,
  removeSync,
} from 'fs-extra';
import { defaultTo } from 'lodash';
import getEnvVar from '../util/getEnvVar';
import { fileDir } from '../paths';

const alreadyAdded: string = 'alreadyAdded';
const success: string = 'success';
const fail: string = 'fail';
const unsupported: string = 'unsupported';

export const response = {
  alreadyAdded,
  success,
  fail,
  unsupported,
};

export default (
  file: string,
  filePath: ?string
): alreadyAdded | success | fail | unsupported => {
  mkdirpSync(fileDir);

  switch (file) {
    case 'bash_profile':
      const actualFilePath = defaultTo(
        filePath,
        path.join(getEnvVar('HOME'), '.bash_profile')
      );
      ensureFileSync(actualFilePath);
      const stat = fs.lstatSync(actualFilePath);
      if (stat.isSymbolicLink()) {
        return alreadyAdded;
      }
      const addedFilePath = path.join(fileDir, 'bash_profile');
      copySync(actualFilePath, addedFilePath);
      removeSync(actualFilePath);
      ensureSymlinkSync(addedFilePath, actualFilePath);
      return success;

    default:
      return unsupported;
  }
};
