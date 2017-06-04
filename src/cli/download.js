import { download } from '../download';
import print from './print';

export default () => {
  download()
    .then(() => {
      print.info('success');
    })
    .catch(err => {
      print.error(`[ERROR] ${err}`);
    });
};
