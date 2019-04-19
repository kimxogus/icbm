import { GistsCreateParamsFiles } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';
import { has, without } from 'lodash';
import stringify = require('json-stable-stringify');

import { appDir } from '../paths';
import { getConfig } from '../config';
import * as gist from '../github/gist';
import version from '../version';

export interface Files {
  [file: string]: GistsCreateParamsFiles;
}

export function getUploadingFiles(): Files {
  const files = fs.readdirSync(appDir).reduce((filesObject, file) => {
    const content = fs.readFileSync(path.join(appDir, file), 'utf8');

    filesObject[file] = {
      content:
        content.trim().length || content.trim() === '\n'
          ? content
          : 'EMPTY_CONTENT',
    };

    return filesObject;
  }, {}) as Files;

  files.syncInfo = {
    content:
      stringify({
        version,
        lastUpdated: new Date().toISOString(),
      }) + '\n',
  };
  return files;
}

export default (): Promise<{ uploaded: string[]; deleted: string[] }> => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'icbm config set repository.type <type>'`
    );

  switch (repoType) {
    case 'gist':
      const files: object = getUploadingFiles();

      return gist.get(getConfig('repository.gist') as string).then(res => {
        const deleted = Object.keys(res.data.files).filter(f => !has(files, f));
        deleted.forEach(f => (files[f] = null));
        return gist.edit(files).then(() =>
          Promise.resolve({
            uploaded: without(Object.keys(files), ...deleted),
            deleted,
          })
        );
      });
    default:
      return Promise.reject({
        message: `${repoType} is not supported yet.`,
        id: 'Invalid repository type',
      });
  }
};
