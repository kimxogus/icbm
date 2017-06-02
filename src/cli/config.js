import { set, isNil } from 'lodash';
import print from './print';
import * as config from '../config';

export default (type: string, key: string, value: string | number) =>
  new Promise((resolve, reject) => {
    switch (type) {
      case 'get':
        if (isNil(key)) {
          print.configObject(config.get());
          resolve();
        } else if (config.validate.leafKey(key)) {
          print.configPair(config.get(), key);
          resolve();
        } else if (config.validate.key(key)) {
          print.configObject(config.get(), key);
          resolve();
        } else {
          print.error('Input error', `Invalid key '${key}'`);
          reject();
        }
        break;
      case 'set':
        if (config.validate.leafKeyAndValue(key, value)) {
          config
            .set(set({}, key, value))
            .then(newConfig => print.configPair(newConfig, key))
            .then(() => resolve());
        } else {
          print.error(
            'Input error',
            `Invalid key '${key}' and value '${value}'`
          );
          reject();
        }
        break;
      default:
        print.error('Input error', `Invalid key '${key}'`);
        reject();
    }
  });
