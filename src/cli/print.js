import chalk from 'chalk';
import stringify from 'json-stable-stringify';
import { get, isNil } from 'lodash';

const printConfigPair = (config: object, key: ?string) =>
  console.log(`${key} = ${stringify(get(config, key))}`);

const printConfigObject = (config: object) =>
  Object.keys(config).forEach(k => printConfigPair(config, k));

const print = {
  config: (config: object, key: ?string) =>
    isNil(key) ? printConfigObject(config) : printConfigPair(config, key),
  error: (type, message) =>
    console.error(chalk.red(`ERROR: ${type} - ${message}`)),
};

export default print;
