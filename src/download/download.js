import fs from 'fs';
import { copySync, removeSync, ensureSymlinkSync } from 'fs-extra';
import path from 'path';
import stringify from 'json-stable-stringify';

import { appDir } from '../paths';
import { getConfig } from '../config';
import * as gist from '../github/gist';
import version from '../version';

type response = Promise<Array<{ name: string, path: string }>>;

const linkFiles = (): response => {
  const config = getConfig();
  return Promise.resolve(
    Object.keys(config)
      .filter(key => key.startsWith('path.'))
      .map(key => {
        const file = key.substr(5);
        const filePath = config[key];

        if (
          fs.existsSync(filePath) &&
          !fs.statSync(filePath).isSymbolicLink()
        ) {
          copySync(filePath, `${filePath}.bak`);
          removeSync(filePath);
        }

        ensureSymlinkSync(path.join(appDir, file), filePath);

        return {
          name: file,
          path: filePath,
        };
      })
  );
};

export default (): response => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'icbm config set <key> <value>'`
    );

  switch (repoType) {
    case 'gist':
      return gist.get(getConfig('repository.gist')).then(res => {
        const files = res.data.files;
        const fileList = Object.keys(files);
        for (let i = 0, len = fileList.length; i < len; i++) {
          const file = fileList[i];
          const content = files[file].content;
          fs.writeFileSync(
            path.join(appDir, file),
            content === 'EMPTY_CONTENT' ? '' : content,
            {
              encoding: 'utf8',
            }
          );
        }

        return linkFiles();
      });
    default:
      return Promise.reject({
        message: `${repoType} is not supported yet.`,
        id: 'Invalid repository type',
      });
  }
};
