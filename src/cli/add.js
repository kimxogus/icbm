import print from './print';
import { add, response, responseType } from '../add';

export default (file: string, filePath: ?string) => {
  const res: responseType = add(file, filePath);

  switch (res) {
    case response.success:
      return print.info(`${file} is successfully added.`);
    case response.alreadyAdded:
      return print.warn(`${file} is already added.`);
    case response.unsupported:
      return print.error(
        'Unsupported configuration',
        `${file} is not supported by default. Specify file path.`
      );
    case response.fail:
      return print.error(`${file} was not added.`);
  }
};
