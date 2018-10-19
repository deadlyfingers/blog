# Developer blog using GitHub Pages with Jekyll

## Prerequisites
- [Node 8.5.0+](https://nodejs.org/en/)
- [Ruby 2.1+](https://rubyinstaller.org/downloads/)

## Requirements

Requires installation of **gulp-cli** v4 and **gulp-gh-pages** for deployment.  

> NB: You will need to remove gulp v3 `npm rm -g gulp` before installing v4.

```shell
npm install -g gulp-cli
npm install --only=dev
```

## Setup

#### Install dependencies
`npm install --only=prod`

Copy required dependencies from *node_modules* into *_dev* build dir

`gulp copy:dev`

#### Install Ruby Gems
```shell
gem install bundler
gem install github-pages
gem install jekyll
gem install tzinfo-data
```

#### Install Ruby Gems required for Windows
```shell
gem install wdm
```

#### Install bundle
`bundle install`

## Development

### Build

`npm run build:dev` 
or
`bundle exec jekyll build -d ./_dev --config _config.yml,_config_dev.yml --incremental --watch`

### Serve

`npm run serve:dev`
or
`bundle exec jekyll serve -d ./_dev --config _config.yml,_config_dev.yml`

#### Or serve with **auto-reload** to external devices using [BrowserSync](https://browsersync.io/docs/command-line):

`browser-sync start --server '_dev' --files '_dev/**/*' --extensions 'html' --port 3000 --reload-debounce 200 --no-ui --no-open`

> NB: Include `--no-online` if there's no internet connection or device is in flight mode!

## GitHub Pages

### Build

`npm run build` 
or 
`bundle exec jekyll build`

### Deploy

Deploys build to 'gh-pages' branch

`gulp deploy`

> NB: This publishes all changes to the the live site!