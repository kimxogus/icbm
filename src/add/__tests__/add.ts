import * as path from 'path';
import { existsSync } from 'fs';
import { removeSync } from 'fs-extra';
import { appDir } from '../../paths';
import add, { AddResponseType } from '../add';

// Clear before tests
if (existsSync(path.join(appDir, '..'))) {
  removeSync(path.join(appDir, '..'));
}

test('add bash_profile', () => {
  expect(add('bash_profile')).toBe(AddResponseType.Success);
  expect(add('bash_profile')).toBe(AddResponseType.AlreadyAdded);
});

test('add bashrc', () => {
  expect(add('bashrc')).toBe(AddResponseType.Success);
  expect(add('bashrc')).toBe(AddResponseType.AlreadyAdded);
});

test('add vimrc', () => {
  expect(add('vimrc')).toBe(AddResponseType.Success);
  expect(add('vimrc')).toBe(AddResponseType.AlreadyAdded);
});

test('add gitconfig', () => {
  expect(add('gitconfig')).toBe(AddResponseType.Success);
  expect(add('gitconfig')).toBe(AddResponseType.AlreadyAdded);
});
