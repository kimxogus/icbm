import github, { authenticate } from './github';
import { get as getConfig, set as setConfig } from '../config';

export const create = (option: object): Promise<object> => {
  authenticate();

  return github.gists.create(option).then(res => {
    setConfig('repository.gist', res.data.id);
    return Promise.resolve(res);
  });
};

export const get = (): Promise<object> => {
  const id = getConfig('repository.gist');
  if (!id || !id.length)
    return Promise.reject({
      message: `Specify gist id with 'xo config set repository.gist <gist id>'`,
      id: `Gist not specified`,
    });

  authenticate();

  return github.gists.get({ id });
};

export const edit = (files: object): Promise<object> => {
  authenticate();

  return github.gists.edit({
    id: getConfig('repository.gist'),
    files,
  });
};
