// @flow
import { isNil, has } from 'lodash';

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

export function validate(
  key?: string,
  value?: string | number | boolean
): boolean {
  if (key.match(/path\.*/)) return true;

  if (!has(keyMap, key)) return false;

  if (arguments.length > 1) {
    if (isNil(value)) return false;

    return String(value).match(keyMap[key]) !== null;
  }

  return keyMap.hasOwnProperty(key);
}
