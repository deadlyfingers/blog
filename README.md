# Developer blog using GitHub Pages with Jekyll

## Prerequisites
- [Node 8.5.0+](https://nodejs.org/en/)
- [Ruby 2.1+](https://rubyinstaller.org/downloads/)

## Requirements

Requires installation of **gulp-cli** v4 and **gulp-gh-pages** for deployment.  

> NB: You will need to remove gulp v3 `npm rm -g gulp` before installing v4.

```shell
npm install -g gulp-cli
npm install
```

## Setup

#### Install dependencies
`npm install`

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

## Development

### Build

`bundle install`

`bundle exec jekyll build -d ./_dev --config _config.yml,_config_dev.yml --incremental --watch`

> Copy dependencies from node_modules into dev build dir

`gulp copy:dev`

### Serve

`bundle exec jekyll serve -d ./_dev --config _config.yml,_config_dev.yml`

### Serve (with auto-reload)

`npm run dev`

or offline mode:

`browser-sync start --server '_dev' --files '_dev' --extensions 'html' --port 3000 --reload-delay 100 --no-open --no-ui --no-online`

## GitHub Pages

### Build

`bundle install`

`bundle exec jekyll build`

### Deploy

Deploy '_site' files to 'gh-pages' branch

`gulp deploy`

> This deploys changes to the the live site!