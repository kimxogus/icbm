import program from 'commander';
import packageJson from '../../package.json';
import config from './config';
import add from './add';

// Version
program.version(packageJson.version);

// Commands
program.command('config <type> [key] [value]').action(config);

program
  .command('add <file...>')
  .option('--path', 'path of the file')
  .action(files => {
    files.forEach(file =>
      add(file, {
        path: program.path,
      })
    );
  });

// Parse and execute
program.parse(process.argv);
