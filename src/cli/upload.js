import { upload } from '../upload';
import print from './print';

export default () => {
  upload()
    .then(res => {
      print.info(`Uploaded files successfully.`);
      print.info(`- ${Object.keys(res.data.files).join(', ')}`);
    })
    .catch(err => {
      print.error(`[ERROR] ${err}`);
    });
};
