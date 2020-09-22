import { Octokit } from '@octokit/rest';
import { createTokenAuth } from '@octokit/auth-token';
import { getConfig } from '../config';
import version from '../version';

const github = new Octokit({
  auth: getConfig('repository.githubToken'),
  debug: process.env.NODE_ENV !== 'production',
  userAgent: `icbm v${version}, node v${process.versions.node}`,
});

export default github;

export async function authenticate(): Promise<void> {
  const token = getConfig('repository.githubToken');

  if (!token)
    throw new Error(
      `Set github token using 'icbm config set repository.githubToken <token>'`
    );

  const authResponse = await createTokenAuth(String(token));

  await github.auth(authResponse);
}
