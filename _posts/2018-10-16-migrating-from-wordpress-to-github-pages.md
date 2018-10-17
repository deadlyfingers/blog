---
layout: post
title: "Migrating from Wordpress blog to GitHub Pages"
author: "David Douglas"
categories: info
tags: [GitHub Pages,Jekyll,Ruby,Wordpress,Blog,Markdown,Website]
published: true
comments: true
---

Wordpress has done a decent job of running my blog. 
But I've longer for something leaner for writing developer code stories as the rich **HTML** text editor tends to introduce too much complexity. 

<!--more-->

Initially I thought about writing a custom blog web app but decided it would be better to consider existing platforms that can handle my requirements.
Ultimately I decided to migrate my Wordpress blog to GitHub pages.

Here's a bunch of things I like with GitHub Pages compared to Wordpress:
- Rather than edit posts in small scroll view I can use a desktop code editor like [VS Code](https://code.visualstudio.com/) which supports full screen editing of text and [live code preview](https://code.visualstudio.com/docs/languages/markdown#_editor-and-preview-synchronization).
- Use GitHub as server - I don't need to provide my own hosting or database.
- Markdown is much easier for writing developer documentation and inline code snippets, but I can also inject HTML when needed.

However there are some downsides during this process:
- Don't expect the migration of Wordpress HTML to MD files to be perfect! In my case the conversion tool had problems preserving spacing in code blocks and some character conversions may need fixed.
- By default all updates will be public on github so you have to think about that if you need to support private posts.

## How to migrate from Wordpress to GitHub Pages (Jekyll)

> GitHub Pages is powered by [Jekyll](https://jekyllrb.com/). To import your Wordpress archive and run Jekyll locally you will need to install [Ruby 2.1](https://www.ruby-lang.org/en/downloads/) or better.

1. If you are migrating an existing blog you have to export your content from the Wordpress admin control panel.  
    `https://YOUR-USER-NAME.wordpress.com/wp-admin/export.php`

2. Import the Wordpress XML archive file as mentioned on the [import wordpress to Jekyll docs](http://import.jekyllrb.com/docs/wordpressdotcom/)
    
    > Install Ruby Gems

    ```shell
    gem install jekyll-import
    gem install hpricot
    gem install open_uri_redirections
    ```
    > Convert Wordpress XML archive to HTML files and download images to 'assets' directory.
    
    ```shell
    ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::WordpressDotCom.run({
      "source" => "C:/Users/USERNAME/Downloads/REPLACE_USING_YOUR_FILE_NAME.wordpress.YYYY-MM-DD.xml",
      "no_fetch_images" => false,
      "assets_folder" => "assets/images"
    })'
    ```

3. Convert HTML files to Markdown files. You can try any number of tools to see what works best for you. I tried various ones including the [reverse_markdown](https://github.com/xijo/reverse_markdown) Ruby gem and the [html2text](https://github.com/aaronsw/html2text.git) Python script. To help batch process the files I created a [Wordpress HTML to MD gist](https://gist.github.com/deadlyfingers/2023c61cbac83bb613393f262693cdf4) to find any **\*.html** files in the '_posts' directory and convert them all to **\*.md** files using [reverse_markdown](https://rubygems.org/gems/reverse-markdown) gem.
    
    > **'wordpress-html-to-md.rb'** gist usage:

    ```shell
    gem install reverse_markdown
    ```
    ```shell
    ruby ./wordpress-html-to-md.rb "_posts"
    ```
    <script src="https://gist.github.com/deadlyfingers/2023c61cbac83bb613393f262693cdf4.js"></script>

    > **html2text** usage:

    ```shell
    ./html2text.py C:/Users/USERNAME/git/blog/_posts/YYYY-MM-DD-filename.html
    ```
    > NB. Don't use "\\" in path otherwise you will get file not found error, use "/" in path instead.

4. To show code syntax highlights you will need to add some styles for [Rouge](https://github.com/jneen/rouge) (GitHub Page's syntax highlighter). You can use Rougify to copy GitHub's code syntax highlighting to a stylesheet.
    ```shell
    gem install rouge
    ```
    ```shell
    rougify style github > _sass/styles/_rouge.scss
    ```

After this you might decide to apply one of the [built-in GitHub Pages themes](https://pages.github.com/themes/) or use a [remote theme](https://github.com/benbalter/jekyll-remote-theme) or [create your own theme](https://jekyllrb.com/docs/themes/). In my case I added the [Foundation XY-Grid](https://foundation.zurb.com/sites/docs/xy-grid.html) module for responsive design grid layouts. I have also included a list of references below which I found useful during the creation of this new blog.

## References

### GitHub Pages settings
- [GitHub Pages](https://pages.github.com/)
- [Using Jekyll](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
- [Themes](https://pages.github.com/themes/)
- [Default Plugins](https://help.github.com/articles/configuring-jekyll-plugins/#default-plugins)
- [markdown: kramdown](https://help.github.com/articles/updating-your-markdown-processor-to-kramdown/)
- [highlighter: rouge](https://help.github.com/articles/using-syntax-highlighting-on-github-pages/)

### Jekyll blog
- [Jekyll structure](https://jekyllrb.com/docs/structure/)
- [Jekyll cheatsheet](https://devhints.io/jekyll)
- [Jekyll md cheatsheet](https://github.com/rstacruz/cheatsheets/blob/master/jekyll.md)
- [Posts](https://jekyllrb.com/docs/posts/)
- [Assets](https://jekyllrb.com/docs/assets/)
- [Sass/SCSS](https://jekyllrb.com/docs/assets/#sassscss)
- [Generate GitHub Rouge SASS](http://ben.balter.com/jekyll-style-guide/themes/)
- [Linking to pages](https://jekyllrb.com/docs/liquid/tags/#link)

### YML Config reference docs
- [YML Syntax](https://help.github.com/articles/page-build-failed-config-file-error/#troubleshooting-_configyml-syntax-errors)
- [Jekyll Configuration](https://jekyllrb.com/docs/configuration/default/)
- [GitHub Pages setup](https://jekyllrb.com/docs/github-pages/)
- [GitHub Pages dependencies](https://pages.github.com/versions/)
- [List of TimeZones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### Disqus
- [Adding Disqus to Jekyll blog](http://sgeos.github.io/jekyll/disqus/2016/02/15/adding-disqus-to-a-jekyll-blog.html)

### Foundation
- [XY-Grid](https://foundation.zurb.com/sites/docs/xy-grid.html)