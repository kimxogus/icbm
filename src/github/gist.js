import github, { authenticate } from './github';
import { get as getConfig, set as setConfig } from '../config';

export const create = (option: object): Promise<object> => {
  authenticate();

  return github.gists.create(option).then(res => {
    setConfig('repository.gist', res.data.id);
    return Promise.resolve(res);
  });
};

export const getOrCreate = (id: ?string): Promise<object> => {
  authenticate();

  return id && id.length
    ? github.gists.get({ id })
    : create({
        public: false,
        files: {
          empty: {
            content: 'empty',
          },
        },
        description: 'Gist for xo',
      });
};

export const edit = (files: object): Promise<object> => {
  authenticate();

  return getOrCreate(getConfig('repository.gist')).then(res =>
    github.gists.edit({
      id: res.data.id,
      files,
    })
  );
};
