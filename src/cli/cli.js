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

program
  .command('add <file>')
  .option('--path', 'path of the file')
  .action(file => {
    add(file, {
      path: program.path,
    });
  });

program.command('upload').action(() => {
  upload();
});

program.command('download').action(() => {
  download();
});

// Parse and execute
program.parse(process.argv);
