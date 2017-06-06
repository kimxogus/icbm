import fs from 'fs';
import path from 'path';
import stringify from 'json-stable-stringify';

import { appDir } from '../paths';
import { getConfig } from '../config';
import * as gist from '../github/gist';
import version from '../version';

export const getUploadingFiles = () => {
  const files = fs.readdirSync(appDir).reduce((filesObject, file) => {
    const content = fs.readFileSync(path.join(appDir, file), 'utf8');

    filesObject[file] = {
      content: content.length ? content : 'EMPTY_CONTENT',
    };

    return filesObject;
  }, {});

  files.syncInfo = {
    content: stringify({
      version,
      lastUpdated: new Date().toISOString(),
    }),
  };
  return files;
};

export default (): Promise<Array<string>> => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'xus config set <key> <value>'`
    );

  switch (repoType) {
    case 'gist':
      const files = getUploadingFiles();

      return gist.edit(files).then(() => Promise.resolve(Object.keys(files)));
    default:
      return Promise.reject({
        message: `${repoType} is not supported yet.`,
        id: 'Invalid repository type',
      });
  }
};
