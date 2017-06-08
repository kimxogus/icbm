import getEnvVar from 'get-env-var';

const regexp = /\$\{(.*?)\}/;

export default (s: string): string => {
  while (regexp.test(s)) {
    const r = RegExp.$1;
    const [name, defaultValue] = r.split(':');
    s = s.replace('${' + r + '}', getEnvVar(name, defaultValue || ''));
  }
  return s;
};
