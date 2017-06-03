import { existsSync } from 'fs';
import remove from 'remove';
import getEnvVal from '../../util/getEnvVar';

// Clear before tests
if (existsSync(getEnvVal('HOME'))) {
  remove.removeSync(getEnvVal('HOME'));
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
