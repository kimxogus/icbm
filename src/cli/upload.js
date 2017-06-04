import { upload } from '../upload';
import print from './print';

export default () => {
  upload()
    .then(() => {
      print.info('success');
    })
    .catch(err => {
      print.error(`[ERROR] ${err}`);
    });
};
