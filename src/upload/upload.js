import { has } from 'lodash';

import { get as getConfig } from '../config';

export default () => {
  const config = getConfig();

  if (!has(config, 'repository.type'))
    throw new Error(
      `Specify the repository type using 'xo config set <key> <value>'`
    );

  const repoType = config['repository.type'];
  switch (repoType) {
    case 'gist':
      break;
    default:
      throw new Error(
        `${repoType} is not supported yet.`,
        'Invalid repository type'
      );
  }
};
