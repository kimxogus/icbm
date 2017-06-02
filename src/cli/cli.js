import program from 'commander';

import config from './config';

program.command('config <type> [key] [value]').action(config);

program.parse(process.argv);
