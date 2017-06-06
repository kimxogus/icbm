import leftPad from 'left-pad';
import co from 'co';
import prompt from 'co-prompt';
import chalk from 'chalk';
import stringify from 'json-stable-stringify';

import { getConfig } from '../config';
import { upload, getUploadingFiles } from '../upload';
import print from './print';
import { authenticate } from '../github/github';
import { get, create } from '../github/gist';

export default () => {
  const gist = getConfig('repository.gist');

  const getGistAndUpload = gist && gist.length
    ? get(gist).then(
        r =>
          r && r.data && r.data.files
            ? executeUpload()
            : Promise.reject({ code: 404 })
      ) //.then(executeUpload)
    : Promise.reject({ code: 404 });

  getGistAndUpload.catch(e => {
    // Gist id is not set or invalid gist id
    if (e && e.code === 404) {
      co(function*() {
        print.error('Invalid gist', 'Gist id is not set or invalid.');
        const gistId = yield prompt(
          chalk.yellow('Gist id(Empty to create a new gist): ')
        );
        (gistId && gistId.length ? get(gistId) : create())
          .then(executeUpload)
          .catch(({ message }) => print.error(`GIST ERROR`, message))
          .then(() => process.stdin.pause());
      });
    }
  });
};

const executeUpload = () =>
  upload()
    .then(uploadedFiles => {
      print.info(`Uploaded files successfully.`);
      print.info(uploadedFiles.map(f => `- ${f}`).join('\n'));
    })
    .catch(err => {
      print.error('Upload error', stringify(err));
    });
