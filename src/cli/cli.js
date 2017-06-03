import program from 'commander';
import config from './config';
import packageJson from '../../package.json';

// Version
program.version(packageJson.version);

// Commands
program.command('config <type> [key] [value]').action(config);

// Parse and execute
program.parse(process.argv);
