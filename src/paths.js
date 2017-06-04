import path from 'path';
import getEnvVar from './util/getEnvVar';

export const appName: string = 'xo';

const home: string = process.env.NODE_EMV === 'production'
  ? getEnvVar('HOME')
  : path.join(getEnvVar('PWD'), 'testHome');

export const appDir: string = path.join(home, `.${appName}`);

export const configFile: string = path.join(appDir, 'config');
