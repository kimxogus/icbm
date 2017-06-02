export const repository = {
  type: (type: string): boolean => ['gist', 'github'].indexOf(type) !== -1,
  url: (url: string): boolean => true,
};

export const user = {
  githubToken: (githubToken: string): boolean => true,
};
