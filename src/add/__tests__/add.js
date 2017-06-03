import path from 'path';
import { existsSync } from 'fs';
import remove from 'remove';
import { dir } from '../../paths';

// Clear before tests
if (existsSync(path.join(dir, '..'))) {
  remove.removeSync(path.join(dir, '..'));
}

import add, { response } from '../add';

test('add bash_profile', () => {
  expect(add('bash_profile')).toBe(response.success);
  expect(add('bash_profile')).toBe(response.alreadyAdded);
});

test('add bashrc', () => {
  expect(add('bashrc')).toBe(response.success);
  expect(add('bashrc')).toBe(response.alreadyAdded);
});

test('add vimrc', () => {
  expect(add('vimrc')).toBe(response.success);
  expect(add('vimrc')).toBe(response.alreadyAdded);
});

test('add gitconfig', () => {
  expect(add('gitconfig')).toBe(response.success);
  expect(add('gitconfig')).toBe(response.alreadyAdded);
});
