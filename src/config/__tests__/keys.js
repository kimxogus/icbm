import * as keys from '../keys';

test('validate keys', () => {
  expect(keys.validate('repository.type')).toBe(true);
  expect(keys.validate('repository.gist')).toBe(true);
  expect(keys.validate('repository.githubToken')).toBe(true);
});

test('validate key and value pairs', () => {
  expect(keys.validate('repository.type', 'gist')).toBe(true);
  expect(keys.validate('repository.type', 'github')).toBe(false);
  expect(keys.validate('repository.type', 'wrong')).toBe(false);
  expect(keys.validate('repository.gist', 'gistId')).toBe(true);
  expect(keys.validate('repository.githubToken', 'githubToken')).toBe(true);
});
