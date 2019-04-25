import * as Octokit from '@octokit/rest';
import { getConfig } from '../config';
import version from '../version';

const github = new Octokit({
  debug: process.env.NODE_ENV !== 'production',
  userAgent: `icbm v${version}, node v${process.versions.node}`,
});

export default github;

export const authenticate = (): Promise<void> => {
  const token = getConfig('repository.githubToken');

  if (!token)
    throw new Error(
      `Set github token using 'icbm config set repository.githubToken <token>'`
    );

  const auth: Octokit.AuthOAuthToken = { type: 'oauth', token: String(token) };
  github.authenticate(auth);
  return Promise.resolve();
};
