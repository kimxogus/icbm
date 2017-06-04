import path from 'path';
import getEnvVar from './util/getEnvVar';

export const appName: string = 'xus';

const home: string = getEnvVar('CI') || getEnvVar('NODE_ENV') === 'test'
  ? path.join(getEnvVar('PWD'), 'testHome')
  : getEnvVar('HOME');

export const appDir: string = path.join(home, `.${appName}`);

export const configFile: string = path.join(appDir, 'config');
