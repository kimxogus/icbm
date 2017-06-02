export type config = {
  repository: ?repository,
  user: ?user,
};

export type repository = {
  type: ?('gist' | 'github'),
  url: ?string,
};

export type user = {
  githubToken: ?string,
};

export type anyConfig = config | repository | user;
