import Github from 'github';
import { get as getConfig } from '../config';
import getEnvVar from '../util/getEnvVar';
import Promise from 'bluebird';

const github = new Github({
  debug: getEnvVar('NODE_ENV') !== 'production',
  headers: {
    'user-agent': 'xus',
  },
  Promise,
});

export default github;

export const authenticate = () => {
  const token = getConfig('repository.githubToken');

  if (!token)
    throw new Error(
      `Set github token using 'xus config set repository.githubToken <token>'`
    );

  return github.authenticate({ type: 'oauth', token });
};
