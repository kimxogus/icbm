import { has } from 'lodash';

const getEnvVar = (variable: string, defaultValue: ?any) => {
  return has(process.env, variable) ? process.env[variable] : defaultValue;
};

export default getEnvVar;
