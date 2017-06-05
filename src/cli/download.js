import { download } from '../download';
import print from './print';
import leftPad from 'left-pad';

export default () => {
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
};
