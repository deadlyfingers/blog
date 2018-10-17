# Developer blog using GitHub Pages with Jekyll

## Prerequisites
- [Node 8.5.0+](https://nodejs.org/en/)
- [Ruby 2.1+](https://rubyinstaller.org/downloads/)

## Setup

`npm install`

### Install Ruby Gems
```
gem install bundler
gem install github-pages
gem install jekyll
gem install tzinfo-data
```

#### Install Ruby Gems required for Windows
```
gem install wdm
```

## Build

`bundle install`

`bundle exec jekyll build --incremental --watch`

## Localhost server

`npm run dev`

or offline mode:

`browser-sync start --server '_site' --files '_site' --extensions 'html' --port 3000 --reload-delay 100 --no-open --no-ui --no-online`

## Serve

`bundle exec jekyll serve`

## Publish

Install **gulp** v4 globally and **gulp-gh-pages**:  

> You will need to remove gulp v3 `npm rm -g gulp` before installing v4.

```
npm install -g gulp-cli
npm install
```

Deploy '_site' build dir to 'gh-pages' branch
```
gulp deploy
```