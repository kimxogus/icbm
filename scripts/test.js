import dotenv from 'dotenv';

process.env.HOME = process.env.PWD;

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