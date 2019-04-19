import * as keys from '../keys';

test('validate key and value pairs', () => {
  expect(keys.validate('repository.type', 'gist')).toBe(true);
  expect(keys.validate('repository.type', 'github')).toBe(false);
  expect(keys.validate('repository.type', 'wrong')).toBe(false);

  expect(keys.validate('repository.gist', 'gistId')).toBe(true);

  expect(keys.validate('repository.githubToken', 'githubToken')).toBe(true);

  expect(keys.validate('file.createBackup', true)).toBe(true);
  expect(keys.validate('file.createBackup', false)).toBe(true);
  expect(keys.validate('file.createBackup', 'true')).toBe(true);
  expect(keys.validate('file.createBackup', 'false')).toBe(true);
  expect(keys.validate('file.createBackup', 'notBoolean')).toBe(false);
});
