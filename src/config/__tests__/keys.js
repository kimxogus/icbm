import * as keys from '../keys';

test('validate keys', () => {
  expect(keys.validate('repository.type')).toBe(true);
  expect(keys.validate('repository.url')).toBe(true);
  expect(keys.validate('repository.githubToken')).toBe(true);
});

test('validate key and value pairs', () => {
  expect(keys.validate('repository.type', 'gist')).toBe(true);
  expect(keys.validate('repository.type', 'github')).toBe(true);
  expect(keys.validate('repository.type', 'wrong')).toBe(false);
  expect(keys.validate('repository.url', 'https://github.com/kimxogus/xo.git')).toBe(true);
  expect(keys.validate('repository.githubToken', 'tokentoken')).toBe(true);
});
