import fs from 'fs';
import path from 'path';
import stringify from 'json-stable-stringify';
import { has, without } from 'lodash';

import { appDir } from '../paths';
import { getConfig } from '../config';
import * as gist from '../github/gist';
import version from '../version';

export const getUploadingFiles = () => {
  const files = fs.readdirSync(appDir).reduce((filesObject, file) => {
    const content = fs.readFileSync(path.join(appDir, file), 'utf8');

    filesObject[file] = {
      content: content.trim().length || content.trim() === '\n'
        ? content
        : 'EMPTY_CONTENT',
    };

    return filesObject;
  }, {});

  files.syncInfo = {
    content:
      stringify({
        version,
        lastUpdated: new Date().toISOString(),
      }) + '\n',
  };
  return files;
};

export default (): Promise<Array<string>> => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'icbm config set repository.type <type>'`
    );

  switch (repoType) {
    case 'gist':
      const files: object = getUploadingFiles();

      return gist.get(getConfig('repository.gist')).then(res => {
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
