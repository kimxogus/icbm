import path from 'path';
import { existsSync } from 'fs';
import { removeSync } from 'fs-extra';
import { appDir } from '../../paths';

// Clear before tests
if (existsSync(path.join(appDir, '..'))) {
  removeSync(path.join(appDir, '..'));
}

import remove, { response } from '../remove';

test('remove bash_profile', () => {
  expect(remove('bash_profile')).toBe(response.success);
  expect(remove('bash_profile')).toBe(response.alreadyRemoved);
});

test('remove bashrc', () => {
  expect(remove('bashrc')).toBe(response.success);
  expect(remove('bashrc')).toBe(response.alreadyRemoved);
});

test('remove vimrc', () => {
  expect(remove('vimrc')).toBe(response.success);
  expect(remove('vimrc')).toBe(response.alreadyRemoved);
});

test('remove gitconfig', () => {
  expect(remove('gitconfig')).toBe(response.success);
  expect(remove('gitconfig')).toBe(response.alreadyRemoved);
});
