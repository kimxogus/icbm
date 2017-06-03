import { existsSync } from 'fs';
import remove from 'remove';
import getEnvVal from '../../util/getEnvVar';

// Clear before tests
if (existsSync(getEnvVal('HOME'))) {
  remove.removeSync(getEnvVal('HOME'));
}

import add, { response } from '../add';

test('add supported configuration files', () => {
  expect(add('bash_profile')).toBe(response.success);
  expect(add('bash_profile')).toBe(response.alreadyAdded);
});
