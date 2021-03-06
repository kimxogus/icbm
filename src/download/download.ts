import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';

import { appDir } from '../paths';
import { getConfig } from '../config';
import * as gist from '../github/gist';

const linkFiles = async (): Promise<{ name: string; path: string }[]> => {
  const config = getConfig();
  return await Promise.all(
    Object.keys(config)
      .filter(key => key.startsWith('path.'))
      .map(async key => {
        const file = key.substr(5);
        const filePath = config[key];

        if (
          fs.existsSync(filePath) &&
          !fs.statSync(filePath).isSymbolicLink()
        ) {
          fsExtra.copyFileSync(filePath, `${filePath}.bak`);
          fsExtra.removeSync(filePath);
        }

        fsExtra.ensureSymlinkSync(path.join(appDir, file), filePath);

        return {
          name: file,
          path: filePath,
        };
      })
  );
};

export default async (): Promise<{ name: string; path: string }[]> => {
  const repoType = getConfig('repository.type');

  if (!repoType)
    throw new Error(
      `Specify the repository type using 'icbm config set <key> <value>'`
    );

  switch (repoType) {
    case 'gist':
      const res = await gist.get(String(getConfig('repository.gist')));
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

      const linkedFiles = await linkFiles();

      return linkedFiles;
    default:
      return Promise.reject({
        message: `${repoType} is not supported yet.`,
        id: 'Invalid repository type',
      });
  }
};
