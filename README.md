# xus

> CLI tool to manage and backup your configuration files

[![npm version](https://img.shields.io/npm/v/xus.svg)](https://npmjs.org/package/xus)
[![npm downloads](https://img.shields.io/npm/dm/xus.svg)](https://npmjs.org/package/xus)
[![Build Status](https://travis-ci.org/kimxogus/xus.svg?branch=master)](https://travis-ci.org/kimxogus/xus)
[![Dependencies Status](https://david-dm.org/kimxogus/xus/status.svg)](https://david-dm.org/kimxogus/xus)
[![DevDependencies Status](https://david-dm.org/kimxogus/xus/dev-status.svg)](https://david-dm.org/kimxogus/xus?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/kimxogus/xus/badge.svg)](https://snyk.io/test/github/kimxogus/xus)


## Prerequisites
- node.js  `>= 4`

## Installation
- npm `npm install -g xus`
- yarn `yarn global add xus`

## Usage

### Add Configurations
- For supported configuration files
```bash
xus add file_name
```

- For not supported configuration files
```bash
xus add your_conf_name /path/to/your_conf
```

- Configurations currently supported
  - bash_profile (`$HOME/.bash_profile`)
  - bashrc (`$HOME/.bashrc`)
  - gitconfig (`$HOME/.gitconfig`)
  - vimrc (`$HOME/.vimrc`)
  - zshrc (`$HOME/.zshrc`)

### Remove Configurations
- This action will remove configuration from *xus* and return it to original path.
  (e.g. remove the symbolic link and return the managed `bash_profile` to `$HOME/.bash_profile`)
```bash
xus remove file_name
```

### Upload Configurations
```bash
xus upload
```

### Download Configurations
```bash
xus download
```

### Managing config
- Set config
```bash
xus config set config_name config_value
```

- Get config
```bash
xus config get config_name
```

- Get all configs
```bash
xus config get
```

- Configurations
  - Repository Type `repository.type` (Only gist is available now)
  - Gist id `repository.gist` (You can set using prompt in uploading and downloading)
  - Github Token `repository.githubToken` (You can set using prompt in uploading. https://github.com/settings/tokens)
  - Create backup on add `file.createBackup` (.bak file will be created on add. `true` by default.)


## TODO
- `remove` action (`xus remove <conf_name>`)
- option for publicity of repo `repository.public` (`false` by default)
- resolve paths in different os and env(like $HOME)
- multiple repositories to backup configurations
- node api
- rewrite in golang(for standalone app)
- support for other apps (list of formulas like `brew list` and `brew cask list`)
