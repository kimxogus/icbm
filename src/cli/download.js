import { authenticate } from '../github/github';
import { get, create } from '../github/gist';
import { download } from '../download';
import { getConfig, setConfig } from '../config';
import print from './print';
import leftPad from 'left-pad';
import co from 'co';
import prompt from 'co-prompt';
import chalk from 'chalk';

export default () => {
  const gist = getConfig('repository.gist');

  const getGistAndDownload = gist && gist.length
    ? get(gist).then(executeDownload)
    : Promise.reject({ code: 404 });

  getGistAndDownload.catch(e => {
    // Gist id is not set or invalid gist id
    if (e && e.code === 404) {
      co(function*() {
        print.error('Gist id is not set or invalid.');
        const gistId = yield prompt(chalk.yellow('Gist id: '));
        get(gistId)
          .then(executeDownload)
          .catch(({ message }) => print.error(`GIST ERROR`, message))
          .then(() => process.stdin.pause());
      });
    }
  });
};

const executeDownload = () =>
  download()
    .then(downloadedFiles => {
      print.info(`Downloaded files successfully.`);
      print.info(
        downloadedFiles
          .map(({ name, path }) => `${leftPad(name, 15)} > ${path}`)
          .join('\n')
      );
    })
    .catch(err => {
      print.error(`[ERROR] ${err}`);
    });
