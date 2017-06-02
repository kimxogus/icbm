import { key, leafKey } from './key';
import { repository, user } from './value';
import { get } from 'lodash';

export const value = {
  repository,
  user,
};

export { key, leafKey };

export const keyAndValue = (k, v) => {
  return key(k) && get(value, k)(v);
};

export const leafKeyAndValue = (k, v) => {
  return leafKey(k) && get(value, k)(v);
};
