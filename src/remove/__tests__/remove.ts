import * as path from 'path';
import { existsSync } from 'fs';
import { removeSync } from 'fs-extra';
import { appDir } from '../../paths';

// Clear before tests
if (existsSync(path.join(appDir, '..'))) {
  removeSync(path.join(appDir, '..'));
}

import remove, { RemoveResponseType } from '../remove';

test('remove bash_profile', () => {
  const firstTry = remove('bash_profile');
  expect(
    [RemoveResponseType.AlreadyRemoved, RemoveResponseType.Success].some(
      r => r === firstTry
    )
  ).toBeTruthy();
  expect(remove('bash_profile')).toBe(RemoveResponseType.AlreadyRemoved);
});

test('remove bashrc', () => {
  const firstTry = remove('bashrc');
  expect(
    [RemoveResponseType.AlreadyRemoved, RemoveResponseType.Success].some(
      r => r === firstTry
    )
  ).toBeTruthy();
  expect(remove('bashrc')).toBe(RemoveResponseType.AlreadyRemoved);
});

test('remove vimrc', () => {
  const firstTry = remove('vimrc');
  expect(
    [RemoveResponseType.AlreadyRemoved, RemoveResponseType.Success].some(
      r => r === firstTry
    )
  ).toBeTruthy();
  expect(remove('vimrc')).toBe(RemoveResponseType.AlreadyRemoved);
});

test('remove gitconfig', () => {
  const firstTry = remove('gitconfig');
  expect(
    [RemoveResponseType.AlreadyRemoved, RemoveResponseType.Success].some(
      r => r === firstTry
    )
  ).toBeTruthy();
  expect(remove('gitconfig')).toBe(RemoveResponseType.AlreadyRemoved);
});
