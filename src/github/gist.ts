import {
  OctokitResponse,
  GistsGetResponseData,
  GistsUpdateResponseData,
} from '@octokit/types';
import github, { authenticate } from './github';
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

export async function create(option?: CreateOption): Promise<any> {
  await authenticate();

  return github.gists
    .create({
      description: 'Gist for icbm',
      public: false,
      ...option,
    })
    .then(res => setConfig('repository.gist', res.data.id));
}

export async function get(
  id?: string
): Promise<OctokitResponse<GistsGetResponseData>> {
  id = id || String(getConfig('repository.gist'));

  if (!id || !id.length) return Promise.reject({ message: 'ID is empty' });

  return github.gists.get({ gist_id: id });
}

export async function edit(
  files: Files
): Promise<OctokitResponse<GistsUpdateResponseData>> {
  await authenticate();

  return github.gists.update({
    gist_id: String(getConfig('repository.gist')),
    files,
  });
}
