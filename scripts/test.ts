import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as jest from 'jest';

process.env.HOME = path.join(process.cwd(), 'testHome');

if (fs.existsSync('.env.test'))
  dotenv.config({
    path: '.env.test',
  });

const argv = process.argv.slice(2);

if (process.env.CI) {
  argv.push('--runInBand');
}

jest.run(argv);
