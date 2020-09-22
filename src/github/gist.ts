import {
  OctokitResponse,
  GistsGetResponseData,
  GistsUpdateResponseData,
} from '@octokit/types';
import github from './github';
import { getConfig, setConfig } from '../config';

export interface File {
  filename: string;
  content: string;
}

export interface Files {
  [file: string]: File;
}

export interface CreateOption {
  files: Files;
  public?: boolean;
}

export const create = (option?: CreateOption): Promise<any> => {
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
): Promise<OctokitResponse<GistsGetResponseData>> => {
  id = id || String(getConfig('repository.gist'));

  if (!id || !id.length) return Promise.reject({ message: 'ID is empty' });

  return github.gists.get({ gist_id: id });
};

export const edit = (
  files: Files
): Promise<OctokitResponse<GistsUpdateResponseData>> => {
  return github.gists.update({
    gist_id: String(getConfig('repository.gist')),
    files,
  });
};
