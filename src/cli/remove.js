// @flow
import print from './print';
import { remove, response, responseType } from '../remove';

export default (file: string) => {
  const res: responseType = remove(file);

  switch (res) {
    case response.success:
      return print.info(`${file} is successfully removed.`);
    case response.alreadyRemoved:
      return print.warn(`${file} seems already removed.`);
    case response.fail:
      return print.error(`${file} was not removed.`);
  }
};
