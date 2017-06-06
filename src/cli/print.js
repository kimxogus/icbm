import chalk from 'chalk';
import { get, isNil } from 'lodash';

const printConfigPair = (config: object, key: ?string) =>
  print.info(`${key} = ${get(config, key)}`);

const printConfigObject = (config: object) =>
  Object.keys(config).forEach(k => printConfigPair(config, k));

const print = {
  config: (config: object, key: ?string) =>
    isNil(key) ? printConfigObject(config) : printConfigPair(config, key),
  info: (...args) => console.log.apply(null, args),
  warn: (...args) => console.log.apply(null, args.map(a => chalk.yellow(a))),
  error: (type, message) =>
    console.error(chalk.red(`ERROR: ${type || ''} - ${message || ''}`)),
};

export default print;
