// @flow
import { isNil, has, startsWith } from 'lodash';

const keyMap = {
  'repository.type': /(gist)/,
  'repository.gist': /[\W]*/,
  'repository.githubToken': /[\w\W]*/,
  'file.createBackup': /(true|false)/,
};

const keys = Object.keys(keyMap);

keys.forEach(key => {
  exports[key] = keyMap[key];
});

export const validate = (...args: string): boolean => {
  const [key, value] = args;
  if (key.match(/path\.*/)) return true;

  if (!has(keyMap, key)) return false;

  if (args.length > 1) {
    if (isNil(value)) return false;

    return String(value).match(keyMap[key]) !== null;
  }

  return keyMap.hasOwnProperty(key);
};
