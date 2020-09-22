import { Octokit } from '@octokit/rest';
import github, { authenticate } from './github';
import { getConfig, setConfig } from '../config';

export interface CreateOption {
  files: Octokit.GistsCreateParamsFiles;
  public?: boolean;
}

export const create = (option?: CreateOption): Promise<any> => {
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

  return github.gists.get({ gist_id: id });
};

export const edit = (
  files: any
): Promise<Octokit.Response<Octokit.GistsUpdateResponse>> => {
  authenticate();

  return github.gists.update({
    gist_id: String(getConfig('repository.gist')),
    files,
  });
};
