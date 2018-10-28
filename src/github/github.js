// @flow
import Github from '@octokit/rest';
import { getConfig } from '../config';
import getEnvVar from 'get-env-var';
import version from '../version';

const github = new Github({
  debug: getEnvVar('NODE_ENV', 'development') !== 'production',
  headers: {
    'user-agent': `icbm v${version}, node v${process.versions.node}`,
  },
});

export default github;

export const authenticate = (): Promise<> => {
  const token = getConfig('repository.githubToken');

  if (!token)
    throw new Error(
      `Set github token using 'icbm config set repository.githubToken <token>'`
    );

  github.authenticate({ type: 'oauth', token });
  return Promise.resolve();
};
