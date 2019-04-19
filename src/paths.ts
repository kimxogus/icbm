import * as path from 'path';

export const appName = 'icbm';

const home: string =
  process.env.CI || process.env.NODE_ENV === 'test'
    ? path.join(process.cwd(), 'testHome')
    : process.env.HOME || '';

export const appDir: string = path.join(home, `.${appName}`);

export const configFile: string = path.join(appDir, 'config');
