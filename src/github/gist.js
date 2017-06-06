import github, { authenticate } from './github';
import { getConfig, setConfig } from '../config';

export const create = (files: object = {}): Promise<object> => {
  authenticate();

  return github.gists
    .create({
      description: 'Gist for xus',
      public: false,
      files,
    })
    .then(res => setConfig('repository.gist', res.data.id));
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