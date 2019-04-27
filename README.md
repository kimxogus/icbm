# icbm

> CLI tool to manage and backup your configuration files

[![npm version](https://img.shields.io/npm/v/icbm.svg)](https://npmjs.org/package/icbm)
[![npm downloads](https://img.shields.io/npm/dm/icbm.svg)](https://npmjs.org/package/icbm)

[![Build Status](https://travis-ci.org/kimxogus/icbm.svg?branch=master)](https://travis-ci.org/kimxogus/icbm)
[![Build status](https://ci.appveyor.com/api/projects/status/5h0p627mhgb4pdxo/branch/master?svg=true)](https://ci.appveyor.com/project/kimxogus/icbm/branch/master)

[![Dependencies Status](https://david-dm.org/kimxogus/icbm/status.svg)](https://david-dm.org/kimxogus/icbm)
[![DevDependencies Status](https://david-dm.org/kimxogus/icbm/dev-status.svg)](https://david-dm.org/kimxogus/icbm?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/kimxogus/icbm/badge.svg)](https://snyk.io/test/github/kimxogus/icbm)

## Prerequisites

- node.js `>= 8`

## Installation

- npm `npm install -g icbm`
- yarn `yarn global add icbm`

## Usage

### Add Configurations

- For supported configuration files

```bash
icbm add file_name
```

- For not supported configuration files

```bash
icbm add your_conf_name /path/to/your_conf
```

- Configurations currently supported
  - bash_profile (`$HOME/.bash_profile`)
  - bashrc (`$HOME/.bashrc`)
  - gitconfig (`$HOME/.gitconfig`)
  - vimrc (`$HOME/.vimrc`)
  - zshrc (`$HOME/.zshrc`)

### Remove Configurations

- This action will remove configuration from _icbm_ and return it to original path.
  (e.g. remove the symbolic link and return the managed `bash_profile` to `$HOME/.bash_profile`)

```bash
icbm remove file_name
```

### Upload Configurations

```bash
icbm upload
```

### Download Configurations

```bash
icbm download
```

### Managing config

- Set config

```bash
icbm config set config_name config_value
```

- Get config

```bash
icbm config get config_name
```

- Get all configs

```bash
icbm config get
```

- Configurations
  - Repository Type `repository.type` (Only gist is available now)
  - Gist id `repository.gist` (You can set using prompt in uploading and downloading)
  - Github Token `repository.githubToken` (You can set using prompt in uploading. https://github.com/settings/tokens)
  - Create backup on add `file.createBackup` (.bak file will be created on add. `true` by default.)

## TODO

- resolve paths in different os and env(like \$HOME)
- multiple repositories to backup configurations
- node api
- rewrite in golang(for standalone app)
- support for other apps (list of formulas like `brew list` and `brew cask list`)
