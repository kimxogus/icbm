import { isNil } from 'lodash';
import * as path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import { copyFileSync, removeSync, existsSync } from 'fs-extra';

import { appDir } from '../paths';
import * as config from '../config';

export enum RemoveResponseType {
  AlreadyRemoved,
  Success,
  Fail,
}

export default (file: string): RemoveResponseType => {
  mkdirpSync(appDir);

  const configKey = `path.${file}`;
  const filePath = String(config.getConfig(configKey));

  if (isNil(filePath)) return RemoveResponseType.AlreadyRemoved;

  removeSync(filePath);
  if (existsSync(path.join(appDir, file))) {
    copyFileSync(path.join(appDir, file), filePath);
    removeSync(path.join(appDir, file));

    config.removeConfig(configKey);

    return RemoveResponseType.Success;
  }

  config.removeConfig(configKey);

  return RemoveResponseType.AlreadyRemoved;
};
