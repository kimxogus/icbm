import * as fs from 'fs-extra';
import path from 'path';

const packageJson = fs.readJSONSync(
  path.resolve(__dirname, '..', 'package.json')
);

export default packageJson.version;
