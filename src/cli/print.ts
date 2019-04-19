import chalk from 'chalk';
import { get, isNil } from 'lodash';

function info(...args) {
  console.log(...args);
}

function printConfigPair(config: object, key?: string): void {
  info(`${key} = ${get(config, key)}`);
}

function printConfigObject(config: object): void {
  Object.keys(config).forEach(k => printConfigPair(config, k));
}

const print = {
  config: (config: object, key?: string) =>
    isNil(key) ? printConfigObject(config) : printConfigPair(config, key),
  info,
  warn: (...args) => console.log(...args.map(a => chalk.bold.yellow(a))),
  error: (type, message?) =>
    console.error(chalk.red(`ERROR: ${type || ''} - ${message || ''}`)),
};

export default print;
