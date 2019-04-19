import * as file from '../file';
import { existsSync } from 'fs';
import { removeSync } from 'fs-extra';
import { appDir } from '../../paths';

// Clear before tests
if (existsSync(appDir)) {
  removeSync(appDir);
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

  expect(file.getConfig(key)).toBe(value);
});
