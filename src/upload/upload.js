import fs from 'fs';
import path from 'path';
import stringify from 'json-stable-stringify';

import { appDir } from '../paths';
import { get as getConfig } from '../config';
import * as gist from '../github/gist';
import version from '../version';

export default (): Promise<?any> => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'xo config set <key> <value>'`
    );

  switch (repoType) {
    case 'gist':
      const files = fs.readdirSync(appDir).reduce((filesObject, file) => {
        filesObject[file] = {
          content: fs.readFileSync(path.join(appDir, file), 'utf8'),
        };
        return filesObject;
      }, {});

      files.syncInfo = {
        content: stringify({
          version,
          lastUpdated: new Date().toISOString(),
        }),
      };

      return gist.edit(files);
    default:
      return Promise.reject({
        message: `${repoType} is not supported yet.`,
        id: 'Invalid repository type',
      });
  }
};
