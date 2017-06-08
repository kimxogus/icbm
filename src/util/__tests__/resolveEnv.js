import resolveEnv from '../resolveEnv';

describe('resolveEnv', () => {
  it('', () => {
    expect(resolveEnv('${PWD}/')).toBe(process.cwd() + '/');
    expect(resolveEnv('${H:ENV}/.env')).toBe('ENV/.env');
  });
});
