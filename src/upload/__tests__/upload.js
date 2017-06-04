import upload from '../upload';
import { set as setConfig, get } from '../../config';
import getEnvVar from '../../util/getEnvVar';

test('upload success with gist', () => {
  expect(() => {
    setConfig('repository.type', 'gist');
    setConfig('repository.githubToken', getEnvVar('GITHUB_TOKEN', 'testToken'));
    upload();
  }).not.toThrowError();
});
