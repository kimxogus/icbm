import print from './print';
import { add, response, responseType } from '../add';

export default (file: string, option: ?object) => {
  const res: responseType = add(file, option);

  switch (res) {
    case response.success:
      return print.info(`${file} is successfully added.`);
    case response.alreadyAdded:
      return print.warn(`${file} is already added.`);
    case response.unsupported:
      return print.error(
        `${file} is not supported by default. Specify path with --path option.`
      );
    case response.fail:
      return print.error(`${file} was not added.`);
  }
};
