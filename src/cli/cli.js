import program from 'commander';
import packageJson from '../../package.json';
import config from './config';
import add from './add';

// Version
program.version(packageJson.version);

// Commands
program.command('config <type> [key] [value]').action(config);

program.command('add <file>').action(add);

// Parse and execute
program.parse(process.argv);
