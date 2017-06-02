import { get } from 'lodash';

const structure = {
  repository: {
    type: true,
    url: true,
  },
  user: {
    githubToken: true,
  },
};

export const key = (k: string): boolean => !!get(structure, k);

export const leafKey = (k: string): boolean => get(structure, k) === true;
