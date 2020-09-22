import * as leftPad from 'left-pad';
import co from 'co';
import prompt from 'co-prompt';
import chalk = require('chalk');

import { get } from '../github/gist';
import { download } from '../download';
import { getConfig, setConfig } from '../config';
import print from './print';

const executeDownload = async () => {
  const downloadedFiles = await download();
  print.info(`Downloaded files successfully.`);
  print.info(
    downloadedFiles
      .map(({ name, path }) => `${leftPad(name, 15)} > ${path}`)
      .join('\n')
  );
};

export default () => {
  const gist = String(getConfig('repository.gist'));

  const getGistAndDownload =
    gist && gist.length
      ? get(gist).then(executeDownload)
      : Promise.reject({ code: 404 });

  getGistAndDownload.catch(e => {
    // Gist id is not set or invalid gist id
    if (e && e.code === 404) {
      co(function* () {
        print.error('Invalid gist', 'Gist id is not set or invalid.');
        const gistId = yield prompt(chalk.green('Gist id: '));
        get(gistId)
          .then(({ data: { id } }) => setConfig('repository.gist', id))
          .then(executeDownload)
          .catch(({ message, ...others }) =>
            print.error(`GIST ERROR`, message + ' ' + JSON.stringify(others))
          )
          .then(() => process.stdin.pause());
      });
    }
  });
};
