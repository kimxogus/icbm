import Github from 'github';
import { getConfig } from '../config';
import getEnvVar from 'get-env-var';
import Promise from 'bluebird';

const github = new Github({
  debug: getEnvVar('NODE_ENV', 'development') !== 'production',
  headers: {
    'user-agent': 'xus',
  },
  Promise,
});

export default github;

export const authenticate = (): Promise<> => {
  const token = getConfig('repository.githubToken');

  if (!token)
    throw new Error(
      `Set github token using 'xus config set repository.githubToken <token>'`
    );

  github.authenticate({ type: 'oauth', token });
  return Promise.resolve();
};
