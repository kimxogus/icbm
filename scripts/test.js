import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = 'test';
process.env.HOME = path.join(process.cwd(), 'testHome');

if (fs.existsSync('.env.test'))
  dotenv.config({
    path: '.env.test',
    silent: true,
  });

const argv = process.argv.slice(2);

if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

if (process.env.CI) {
  argv.push('--runInBand');
}

require('jest').run(argv);
