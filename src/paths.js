import path from 'path';
import getEnvVar from 'get-env-var';

export const appName: string = 'xus';

const home: string = getEnvVar('CI', false) ||
  getEnvVar('NODE_ENV', 'development') === 'test'
  ? path.join(process.cwd(), 'testHome')
  : getEnvVar('HOME', '');

export const appDir: string = path.join(home, `.${appName}`);

export const configFile: string = path.join(appDir, 'config');
