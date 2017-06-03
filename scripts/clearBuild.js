import { existsSync } from 'fs';
import remove from 'remove';
import { build } from './paths';

if (existsSync(build)) {
  remove.removeSync(build);
}
