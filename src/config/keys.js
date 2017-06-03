import { isNil, has } from 'lodash';

const keyMap = {
  'repository.type': /(github|gist)/,
  'repository.url': /[\w\W]*/,
  'repository.githubToken': /[\w\W]*/,
};

const keys = Object.keys(keyMap);

keys.forEach(key => {
  exports[key] = keyMap[key];
});

export const validate = (key: string, value: ?(string | number)): boolean => {
  if (!has(keyMap, key)) return false;

  if (isNil(value)) return true;

  return String(value).match(keyMap[key]) !== null;
};
