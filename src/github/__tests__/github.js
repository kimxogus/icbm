import github, { authenticate } from '../github';
import { set as setConfig } from '../../config';
import getEnvVar from '../../util/getEnvVar';

test('auth', () => {
  setConfig(
    'repository.githubToken',
    getEnvVar('GITHUB_TOKEN', 'invalidToken')
  );
  authenticate();
});
