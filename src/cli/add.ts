import print from './print';
import { add, AddResponseType } from '../add';

export default (file: string, filePath?: string) => {
  const res: AddResponseType = add(file, filePath);

  switch (res) {
    case AddResponseType.Success:
      return print.info(`${file} is successfully added.`);
    case AddResponseType.AlreadyAdded:
      return print.warn(`${file} seems already added.`);
    case AddResponseType.Unsupported:
      return print.error(
        'Unsupported configuration',
        `${file} is not supported by default. Specify file path.`
      );
    case AddResponseType.Fail:
      return print.error(`${file} was not added.`);
  }
};
