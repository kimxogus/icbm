import path from 'path';
import getEnvVar from './util/getEnvVar';

export const appName: string = 'xo';

const home: string = process.env.CI || process.env.NODE_EMV === 'test'
  ? path.join(getEnvVar('PWD'), 'testHome')
  : getEnvVar('HOME');

export const appDir: string = path.join(home, `.${appName}`);

export const configFile: string = path.join(appDir, 'config');
