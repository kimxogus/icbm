import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

process.env.NODE_ENV = 'test';
process.env.HOME = path.join(process.cwd(), 'testHome');

if (fs.existsSync('.env.test'))
  dotenv.config({
    path: '.env.test',
  });

const argv = process.argv.slice(2);

if (process.env.CI) {
  argv.push('--runInBand');
}

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
require('jest').run(argv);
