import github, { authenticate } from './github';
import { get as getConfig, set as setConfig } from '../config';

export const create = (option: object): Promise<object> => {
  authenticate();

  return github.gists.create(option).then(res => {
    setConfig('repository.gist', res.data.id);
    return Promise.resolve(res);
  });
};

export const get = (id: ?string): Promise<object> => {
  id = id || getConfig('repository.gist');

  if (!id || !id.length) return Promise.reject('EMPTY');

  return github.gists.get({ id });
};

export const edit = (files: object): Promise<object> => {
  authenticate();

  return github.gists.edit({
    id: getConfig('repository.gist'),
    files,
  });
};
