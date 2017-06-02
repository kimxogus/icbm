import chalk from 'chalk';
import stringify from 'json-stable-stringify';
import { get, isPlainObject } from 'lodash';

const printConfigPair = (configuration, key: string, path: string) =>
  console.log(`${path || key} = ${stringify(get(configuration, key))}`);

const printConfigObject = (configuration, keys = []) =>
  Object.keys(configuration).forEach(k => {
    const childKeys = [...keys, k];
    isPlainObject(configuration[k])
      ? printConfigObject(configuration[k], childKeys)
      : printConfigPair(configuration, k, childKeys.join('.'));
  });

const print = {
  configObject: config =>
    Object.keys(config).length ? printConfigObject : console.log(config),
  configPair: printConfigPair,
  error: (type, message) =>
    console.error(chalk.red(`ERROR: ${type} - ${message}`)),
};

export default print;
