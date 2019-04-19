import * as Octokit from '@octokit/rest';
import github, { authenticate } from './github';
import { getConfig, setConfig } from '../config';

export interface CreateOption {
  files: Octokit.GistsCreateParamsFiles;
  public?: boolean;
}

export const create = (option?: CreateOption): Promise<object> => {
  authenticate();

  return github.gists
    .create({
      description: 'Gist for icbm',
      public: false,
      ...option,
    })
    .then(res => setConfig('repository.gist', res.data.id));
};

export const get = (
  id?: string
): Promise<Octokit.Response<Octokit.GistsGetResponse>> => {
  id = id || String(getConfig('repository.gist'));

  if (!id || !id.length) return Promise.reject({ message: 'ID is empty' });

  /* eslint-disable-next-line @typescript-eslint/camelcase */
  return github.gists.get({ gist_id: id });
};

export const edit = (
  files: object
): Promise<Octokit.Response<Octokit.GistsUpdateResponse>> => {
  authenticate();

  return github.gists.update({
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    gist_id: String(getConfig('repository.gist')),
    files,
  });
};
