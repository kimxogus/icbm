import { existsSync } from 'fs';
import remove from 'remove';
import chalk from 'chalk';
import config from '../config';

const configDir = './.xo';

// Clear before tests
if (existsSync(configDir)) {
  remove.removeSync(configDir);
}

test('initially config contains nothing', () => {
  // $ {}
  console.log(chalk.yellow('> {}'));
  config('get');
});

test('set repository type as gist', () => {
  console.log(chalk.yellow('> repository.type = "gist"'));
  config('set', 'repository.type', 'gist').then(() => {
    console.log(chalk.yellow('> repository.type = "gist"'));
    config('get', 'repository.type');
  });
});

test('set repository type as github', () => {
  console.log(chalk.yellow('> repository.type = "github"'));
  config('set', 'repository.type', 'github').then(() => {
    console.log(chalk.yellow('> repository.type = "github"'));
    config('get', 'repository.type');
  });
});
