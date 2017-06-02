import { existsSync } from 'fs';
import remove from 'remove';
import * as file from '../file';

const configDir = './.xo';

// Clear before tests
if (existsSync(configDir)) {
  remove.removeSync(configDir);
}

test('get nothing', () => {
  expect(file.get()).toEqual({});
});

test('set and get repository type', () => {
  file.set({ repository: { type: 'git' } }).then(newConfig => {
    expect(newConfig).toHaveProperty('repository');
    expect(newConfig.repository).toHaveProperty('type');
    expect(newConfig.repository.type).toBe('git');

    expect(file.get('repository.type')).toBe('git');
  });
});
