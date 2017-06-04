import * as file from '../file';
import { existsSync } from 'fs';
import remove from 'remove';
import { dir } from '../../paths';

// Clear before tests
if (existsSync(dir)) {
  remove.removeSync(dir);
}

test('get nothing', () => {
  expect(file.get()).toMatchObject({});
});

test('set and get repository type', () => {
  const key = 'repository.type';
  const value = 'gist';

  const newConfig = file.set(key, value);
  expect(newConfig).toMatchObject({
    [key]: value,
  });

  expect(newConfig[key]).toBe(value);

  expect(file.get(key)).toBe(value);
});

test('set and get repository url', () => {
  const key = 'repository.url';
  const value = 'https://github.com/kimxogus/xo.git';

  const newConfig = file.set(key, value);
  expect(newConfig).toMatchObject({
    [key]: value,
  });

  expect(newConfig[key]).toBe(value);

  expect(file.get(key)).toBe(value);
});
