import program from 'commander';
import config from './config';
import add from './add';
import upload from './upload';
import download from './download';
import version from '../version';

// Version
program.version(version);

// Commands
program.command('config <type> [key] [value]').action(config);

program.command('add <file> [path]').action((file, path) => add(file, path));

program.command('upload').action(() => {
  upload();
});

program.command('download').action(() => {
  download();
});

// Parse and execute
program.parse(process.argv);
