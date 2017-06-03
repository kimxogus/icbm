import path from 'path';
import getEnvVar from './util/getEnvVar';

export const appName: string = 'xo';

export const dir: string = path.join(getEnvVar('HOME'), `.${appName}`);

export const configFile: string = path.join(dir, 'config');
