import * as file from '../file';
import { existsSync } from 'fs';
import remove from 'remove';
import { dir } from '../../paths';

// Clear before tests
if (existsSync(dir)) {
  remove.removeSync(dir);
}

test('get nothing', () => {
  expect(file.getConfig()).toMatchObject({});
});

test('set and get repository type', () => {
  const key = 'repository.type';
  const value = 'gist';

  const newConfig = file.setConfig(key, value);
  expect(newConfig).toMatchObject({
    [key]: value,
  });

  expect(newConfig[key]).toBe(value);

  console.log(file.getConfig(key));

  expect(file.getConfig(key)).toBe(value);
});
