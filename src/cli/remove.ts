import print from './print';
import { remove, RemoveResponseType } from '../remove';

export default (file: string) => {
  const res: RemoveResponseType = remove(file);

  switch (res) {
    case RemoveResponseType.Success:
      return print.info(`${file} is successfully removed.`);
    case RemoveResponseType.AlreadyRemoved:
      return print.warn(`${file} seems already removed.`);
    case RemoveResponseType.Fail:
      return print.error(`${file} was not removed.`);
  }
};
