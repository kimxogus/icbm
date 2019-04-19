import co from 'co';
import prompt from 'co-prompt';
import chalk from 'chalk';

import { getConfig, setConfig } from '../config';
import { upload, getUploadingFiles } from '../upload';
import print from './print';
import { get, create } from '../github/gist';

const executeUpload = () =>
  upload()
    .catch(
      err =>
        new Promise((resolve, reject) => {
          if (err && err.code === 401) {
            co(function*() {
              print.error('Invalid token', 'Github Token is not valid.');
              const githubToken = yield prompt(chalk.green('Github Token: '));
              setConfig('repository.githubToken', githubToken);
              resolve(upload());
            });
          } else {
            reject(err);
          }
        }) as Promise<{ uploaded: string[]; deleted: string[] }>
    )
    .then(({ uploaded, deleted }) => {
      print.info(`Success`);

      if (uploaded.length) {
        print.info(chalk.bold.blue('Uploaded files'));
        print.info(uploaded.map(f => `  - ${f}`).join('\n'));
      }

      if (deleted.length) {
        print.info(chalk.bold.magenta('Deleted files'));
        print.info(deleted.map(f => `  - ${f}`).join('\n'));
      }
    });

export default () => {
  const gist = getConfig('repository.gist') as string;

  const getGistAndUpload =
    gist && gist.length
      ? get(gist).then(r =>
          r && r.data && r.data.files
            ? executeUpload()
            : Promise.reject({ code: 404 })
        )
      : Promise.reject({ code: 404 });

  getGistAndUpload.catch(e => {
    // Gist id is not set or invalid gist id
    if (e && e.code === 404) {
      co(function*() {
        print.error('Invalid gist', 'Gist id is not set or invalid.');
        const gistId = yield prompt(
          chalk.green('Gist id(Empty to create a new gist): ')
        );
        let createOrGet;
        if (gistId && gistId.length) {
          createOrGet = get(gistId).then(() =>
            setConfig('repository.gist', gistId)
          );
        } else {
          const response: string = yield prompt(
            chalk.green('Do you want to make it public?(y/n)')
          );

          const publicity = ['y', 'yes'].indexOf(response.toLowerCase()) !== -1;

          print.info(
            `Gist will be created in ${chalk.bold.white(
              publicity ? 'pubic' : 'private'
            )}.`
          );

          createOrGet = create({
            files: getUploadingFiles(),
            public: publicity,
          });
        }
        createOrGet
          .then(() => setConfig('repository.gist', gistId))
          .then(executeUpload)
          .catch(({ message }) => print.error(`GIST ERROR`, message))
          .then(() => process.stdin.pause());
      });
    }
  });
};
