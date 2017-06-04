import { isNil, has, startsWith } from 'lodash';

const keyMap = {
  'repository.type': /(gist)/,
  'repository.url': /[\w\W]*/,
  'repository.githubToken': /[\w\W]*/,
};

const keys = Object.keys(keyMap);

keys.forEach(key => {
  exports[key] = keyMap[key];
});

export const validate = (key: string, value: ?string): boolean => {
  if (key.match(/path\.*/)) return true;

  if (!has(keyMap, key)) return false;

  if (isNil(value)) return true;

  return String(value).match(keyMap[key]) !== null;
};
