var path = require('path');

process.env.HOME = process.env.PWD;

require('dotenv').config({
  path: path.join(__dirname, '.env.test'),
  silent: true,
});

var argv = process.argv.slice(2);

if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

if (process.env.CI) {
  argv.push('--runInBand');
}

require('jest').run(argv);
