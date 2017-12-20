// @flow
import { isNil } from 'lodash';
import print from './print';
import * as config from '../config';

export default (type: string, key: ?string, value: ?(string | number)) => {
  switch (type) {
    case 'get':
      if (isNil(key)) {
        print.config(config.getConfig());
      } else if (config.keys.validate(key)) {
        print.config(config.getConfig(), key);
      } else {
        print.error('Input error', `Invalid key '${key}'`);
      }
      break;
    case 'set':
      if (config.keys.validate(key, value)) {
        const newConfig = config.setConfig(key, value);
        print.config(newConfig, key);
      } else {
        print.error('Input error', `Invalid key '${key}' and value '${value}'`);
      }
      break;
    default:
      print.error(
        'Input type',
        `Invalid type '${type}'. Only 'set' and 'get' is available`
      );
  }
};
