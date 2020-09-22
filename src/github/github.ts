import { Octokit } from '@octokit/rest';
import { getConfig } from '../config';
import version from '../version';

const token = getConfig('repository.githubToken');

if (!token) {
  throw new Error(
    `Set github token using 'icbm config set repository.githubToken <token>'`
  );
}

const github = new Octokit({
  auth: token,
  debug: process.env.NODE_ENV !== 'production',
  userAgent: `icbm v${version}, node v${process.versions.node}`,
});

export default github;
