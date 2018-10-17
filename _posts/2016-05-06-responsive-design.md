---
layout: post
title: Responsive Design from problem to production
date: 2016-05-06 12:06:45.000000000 +01:00
published: true
categories: info
tags:
- Cordova
- Design
- Responsive Design
meta:
  dsq_thread_id: '5670805712'
comments: true
author: David Douglas
---
Responsive Design is often seen in terms of technical execution or production. In this article I will describe what it means to design responsively as a design process from problem to production.

Contents:

- Responsive Design for designers
- Responsive Design for developers
- Responsive Design in production

## Background

### The need for responsive design

The idea of designing multiple versions of a website optimized for mobile and desktop might sound like a good idea, but a separate design approach will not scale easily as “the number of unique screen resolutions being used to access web sites is increasingly varied and growing at a rapid pace” <sup><a href="#1">[1]</a></sup>. I only have to look back at my last three phones I've purchased and each one has a larger physical display than the last one. (Admittedly this was not always by choice as the new models I wanted were not made available in the smaller form factor, due to the “bigger is better” <sup><a href="#2">[2]</a></sup> style trend of the phone industry.) As a result, my phone displays more pixels than my old 20” desktop screen which is easier to comprehend with the release of phones with 4K displays. So if I end up on some mobile 'optimized' site with reduced functionality or content I will always request the full-fat Desktop experience. I feel the very fact that there is a button to request the 'Desktop version' of a website on a mobile device is like an admission of design failure.

Responsive design is the ability for a website to display the same content across all screen sizes and resolutions often by using a resizable layout or grid (therefore removing the need for the user to choose what version of the site they want to see). Ethan Marcotte who first described 'Responsive Design' as the way forward proposed “rather than tailoring disconnected designs to each of an ever-increasing number of web devices, we can treat them as facets of the same experience" <sup><a href="#3">[3]</a></sup>. Since then there have been plenty of articles describing the technical characteristics of [responsive web design](https://developers.google.com/webmasters/mobile-sites/mobile-seo/responsive-design#why-responsive-design) and why it is recommended; ultimately our goal is about creating the best experience for users, but [responsive design will benefit SEO](https://webmasters.googleblog.com/2015/02/finding-more-mobile-friendly-search.html) for mobile searches as well.

## Intro

### What makes good design?

There are many design apps and developer tools available, but some tools and techniques are better suited for responsive web design. But before I launch into responsive design I'd like to consider the design aspect. If I was to share one truth from my time learning graphic design and all the years of experience as a designer, it would be; **good design needs a good problem**. As a designer I always have the desire to produce an award winning or world class design for every project. To reproduce success is really hard and that's why designers develop some form of working habit or pattern to try to repeat successful outcomes. This is often explained as the 'Design Process'. I don't wish to cover every variation of the design process but I feel its good practice to review the general principles:

1. Research / investigation
2. Design brief
3. Generation of ideas
4. Synthesis
5. Final design and production

The word 'design' infers the need to solve a particular problem. Therefore, it is important to start the design process with knowledge and thought. Sometimes its all to easy to think we know enough about what the end product should look like that we fail to investigate or question the motivation for design. When the problem isn't immediately obvious it will take a certain amount of research into the subject to be able to ask the right questions to find out the problem which the design will aim to solve. When the problem is known, we can describe the solution which will solve the problem - this forms the design brief. When it comes to generating ideas it maybe helpful to have a brain storming session first. The best ideas (traditionally three) are identified as concepts for further development and design synthesis. Finally, the strongest concept is selected as the solution for final design and production.

I encourage designers to define your own design process (or pattern for success). When [Steve Jobs asked designer Paul Rand to generate some logo ideas](http://youtu.be/vJthkRrQcfo) for them to look at he declined suggesting that he would only present them with the solution to their problem. I admire Rand's thinking – I feel when I have to ask a client about which options they prefer its usually because I haven't found the right solution yet.

Responsive design is the recognised technical solution to the diverse screen size problem, but we must always consider the design aspect of a project. I must constantly challenge myself to find a good problem to solve. Without a good problem to solve I will just be pushing pixels and not fulfilling my purpose as a designer.

## Responsive Design for designers

If you are a designer for print it helps to have an understanding of the print production process. Similarly, with responsive web design it is important to know how responsive developer tools operate. When it comes to design for print designers use grids and guides for page layout. This grid layout mechanism is similar for web developers except the grid will dynamically resize depending on window or screen size. The most popular grids for responsive design are [Bootstrap](https://getbootstrap.com/examples/grid/) and [Foundation](http://foundation.zurb.com/grid.html) so even if you don't like to get your hands dirty with code, it is something that anyone can play with and see how design elements (or columns) will react as the dynamic grid changes with different widths. By default, both grid systems use a 12 column grid but you can also customize the number of columns with [Bootstrap](http://getbootstrap.com/customize/) and with [Foundation using Sass](http://foundation.zurb.com/sites/docs/v/5.5.3/components/grid.html). Designers who have a grasp of how the dynamic grid operates on the production or development side will be in a better position to create 'responsive-ready' designs.

<img src='{{ site.baseurl }}/assets/images/Sketch-1024.png' />

### Design tools

When I started designing for web there was only the desktop browser to think about so the basic approach of designing for the lowest common resolution worked well. Initially I used Photoshop for web designs with pixel perfect layouts. But as consumer monitors became capable of displaying greater resolutions it was possible to reproduce richer layouts influenced by print design. Illustrator became a superior tool for web design as it offered advanced control of grids and guides originally used for print design. Illustrator was also vector based and that made it easier to stretch out graphics as screens got bigger. Because of this I feel vector based tools are vastly more equipped for responsive design work than pixel-based design tools. But while Illustrator is a great tool for seasoned print design professionals, some digital designers might prefer something a little lighter and easier to use like Sketch or the new Experience Design app. However, the problem with all these design tools is that none can produce design with responsive information. Even the new digital design apps still feel like design for print tools stuck with static canvas layouts and limited bitmap resizing that fail to scale in a way that mimics the production process (ie. CSS background properties). Because of the lack of professional tools capable of responsive design that means the designer has to do extra work. For responsive designs I will design at least two size layouts for each page. I like to design a page in portrait aspect to represent a mobile view, and landscape aspect to represent desktop or tablet. So as long as a designer understands how responsive grids or dynamic columns work, then these designs should be easily fused together during development or production stage.

## Responsive Design for developers

There is an abundance of tools for developing responsive websites. But just like I mentioned that it was important for designers to think about the development or production I also feel responsive web developers should be mindful of the design side. Developers need to be aware of the current problem that professional design tools don't contain responsive information and that means they will need to work closer with designers to figure out how to merge separate designs into one single responsive design. Responsive web developers will need to be familiar with the design grid so that they can turn page designs into a single dynamic layout of HTML and CSS.

### The language of responsive web design

CSS is the design language of the web. But CSS is rather an unwieldy art that does not sit comfortably in a designer or developer camp. I find CSS must be constantly tweaked along with the HTML elements to achieve the required layout, especially with the added complication of responsive design media queries. It is therefore preferential to use web technologies that are fast to deploy and allow live refreshing when developing responsive design.

### Responsive web kit

Just like I encouraged designers to make their own design process, I also encourage developers to use or discover the web technologies that will work best for producing the website or web app.

Unsurprisingly it's not possible to cover every web technology in one article so I will explain the reasons behind the web technologies that I've been consistently using for my recent projects. Plus, I really want to share my favourite client-side web design / developer stack because if you are passionate about design I think you will like it too!

<img src='{{ site.baseurl }}/assets/images/bower-logo.png' />

### Project dependencies

Responsive web projects tend to use a number of third party dependencies, and package managers can be used to help install and version manage them all. [Bower](http://bower.io/) is awesome for managing project dependencies like Bootstrap or jQuery. While [NPM](https://nodejs.org) is great for install testing and build tools like Gulp and BrowserSync. Package management is also advantageous for source controlled projects as it can be easily setup to prevent committing a shed load of third party code into your repro. Following this procedure means contributor commits are kept clean and will make it easier to inspect changes or code review.

<img src='{{ site.baseurl }}/assets/images/logo-red.png' />

### Design as you go

A painter will add strokes of paint to his canvas, while a sculptor will chip bits of a rock to expose an image. Designing websites is a progressive art that is both additive like a painter and subtractive like a sculptor. Can you imagine asking a painter or sculptor to work blind folded? As a designer I can't produce my best work unless I have real-time feedback of my adjustments. I need to see and interact with my design in real-time and across multiple devices. That's why [BrowserSync](https://www.browsersync.io) is the single most important responsive design tool for client-side web development. 'Live reload' or 'live preview' is important for web design, and with responsive web design it's mission critical to test all the desktop and touch screens!

<img src='{{ site.baseurl }}/assets/images/PolymerLogo.png' />

### A UI kit for web apps

Ever wanted to replicate the performance of the native UITableView on iOS or ListView on Android? Polymer's 'iron-list' and 'iron-image' elements can be used to create ['buttery-smooth' scrolling recyclable lists at 60fps](https://www.youtube.com/watch?v=2UKPRbrw3Kk). Polymer is also built on top of [Web Components](http://webcomponents.org) which allows you create your own reusable elements, but Polymer also provides a ['Material Design' UI kit](https://elements.polymer-project.org/browse?package=paper-elements) suited for [responsive web app development](https://elements.polymer-project.org/guides/responsive-material-design-layouts). I also find the template and binding model lends itself well for creating responsive designs. Polymer is well suited for developing SPAs (single page applications) and can support [client-side routing](https://www.youtube.com/watch?v=iDQqP5Yyczg).

<img src='{{ site.baseurl }}/assets/images/SASS.png' />

### Smarter CSS

Design should be an enjoyable art, but can you imagine what a lot of CSS is like to manage! All these responsive elements, layout grids, images and glyphs will add lines and lines of CSS. The sheer amount of CSS required by a responsive design project could very easily and quickly become unmanageable. [Sass or SCSS](http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better) is just like writing CSS, except you can do it with less code and fewer lines of code are easier to manage. Sass variables will enable designers to create a theme to easily define or tweak colours, type styles and spacing. Another powerful feature is 'mixins' which can be used to reuse common styles, define responsive media queries, generate image tiles, build font faces and include browser prefixes. Sass will reduce the number of lines of CSS you need to manage.

<img src='{{ site.baseurl }}/assets/images/Bootstrap.png' />

### Responsive Grid

When it comes to responsive web design the use of a popular grid system like Bootstrap is a good place to start. I do feel however the default four tier grid system (xs, sm, md, lg) of Bootstrap 3 doesn't give me enough granular control to deal with phone vs phablet sized devices. So I use the Bootstrap grid as a starting point and usually add extra media queries for smaller mobile devices. Bootstrap 4 promises to address this issue and will deliver a more comprehensive five tier grid system (xs, sm, md, lg, xl) for responsive design amongst [other differences](http://www.quackit.com/bootstrap/bootstrap_4/differences_between_bootstrap_3_and_bootstrap_4.cfm).

```scss
/* Bootstrap 3 four tier grid */

@mixin media-xs() {	
  @media (max-width: 767px) {
    @content;	
  }
}

@mixin media-sm() {	
  @media (min-width: 768px) {
    @content;	
  }
}

@mixin media-md() {	
  @media (min-width: 992px) {
    @content;	
  }
}

@mixin media-lg() {	
  @media (min-width: 1200px) {
    @content;	
  }
}
```

### HD is the new standard

Retina displays are everywhere these days! If you walk into a phone shop today, I reckon it would be harder to find a phone without an HD display. The new [HTML5 picture element](https://software.intel.com/en-us/html5/hub/blogs/html5-picture-element) allows developers to specify higher resolution images so the graphics will display sharper. But I still prefer to use CSS media queries to handle 'Retina' (@2x) and 'Retina HD' (@3x) images.

```scss
@mixin media-2x() {	
  @media (min-resolution: 144dpi), (min-device-pixel-ratio: 1.25), (-webkit-min-device-pixel-ratio: 2) {
   @content;
 }
}

@mixin media-3x() {	
 @media (min-resolution: 288dpi), (min-device-pixel-ratio: 2.25), (-webkit-min-device-pixel-ratio: 3) {
   @content;
 }
}
```

I find the CSS method gives more control over scaling, cropping and positioning which can be advantageous for responsive designers. With the CSS background image methods I can also use an image sprite technique to load in a texture map (or texture atlas) of tiled images and this improves page load times as there will be less http requests.

```scss
@mixin bg-position($row, $col, $width, $height) {
	background-position: (-$col * $width) (-$row * $height);
}

@mixin bg-size($rows, $cols, $width, $height) {
	background-size: ($cols * $width) ($rows * $height);
}
```

One final thing though, high definition images are much larger in filesize so make sure to compress all bitmaps! [ImageOptim](https://imageoptim.com/) is a great image compression tool I use on Mac, though they also recommend [File Optimizer for Windows](http://nikkhokkho.sourceforge.net/images/FileOptimizerSetup.exe).

<img src='{{ site.baseurl }}/assets/images/icomoon.png' />

### Vector glyphs

With responsive design there is always a need to scale graphics. Vector graphics are resolution independent and can be scaled to any size and that makes them a great asset. The good news it that [most modern browsers support SVG](http://caniuse.com/#feat=svg). But if you have a set of vector icons that are monochromic, then a neater way to bring these to web is by exporting them all as a custom font. [Icomoon](https://icomoon.io/) is a free online tool to create custom font glyphs. Oh, and because its seen as a font you can take advantage of CSS font sizing and colour properties.

<img src='{{ site.baseurl }}/assets/images/gulp-3x.png' />

### Automate all the things

[Gulp](http://gulpjs.com) makes it easy to develop with full source, or build a minified version for production. Gulp also watches for source code changes and works in conjunction with BrowserSync. So whether you fiddle with HTML, edit a line of script, tweak a style, modify an image or asset it can notify BrowserSync to reload. Gulp can even compile Sass into normal CSS for reloading live design changes.

## Production

### Building web apps with Cordova

[Cordova tools](https://cordova.apache.org/) make it easy to package your web app as a [hybrid app](http://developer.telerik.com/featured/what-is-a-hybrid-mobile-app/) for distribution on multiple app stores. But the big challenge for web app developers is creating a user experience that will look and feel as good as a [native app](http://www.pcmag.com/encyclopedia/term/47651/native-application).

### App-ify web view behaviours

The web view provided by iOS and Android come with a number of behaviours that are designed to improve user experience with websites. In a website context this is true, but when it comes to responsively designed web apps these web view behaviours result in undesirable effects as far as an app experience is concerned:

1. Page bounce or spring – pages have a bounce or spring effect, but apps don't bounce.
2. Double tap zoom – pages allow double tap regional zooming, but apps don't zoom. 
3. 300ms tap delay – page interactions are artificially slower to accommodate the double tap zoom gesture, but apps don't exhibit unresponsiveness.
4. Long tap inline magnification – pages allow prolonged selection for inline magnification, but apps don't show inline magnification everywhere.
5. Global user selection – page selection is everywhere, but apps only provide selection where user input is desired.

Fortunately, most of these web view behaviours can be tamed so a hybrid app can behave in a native app manner that a user would expect.

1. Page bounce or spring behaviour can be disabled by setting Cordova's 'DisallowOverscroll' preference to 'true'.
    ```xml
    <preference name="DisallowOverscroll" value="true"></preference>
    ```  
2. Double tap zoom behaviour can be disabled by setting Cordova's 'EnableViewportScale' preference to 'true' and setting the HTML5 viewport meta tag (http://www.w3schools.com/css/css\_rwd\_viewport.asp) to disable user scaling.
    ```xml
    <preference name="EnableViewportScale" value="true"></preference>
    ```
    ```xml
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    ```  
3. The 300ms click delay is fixable on Chrome by [setting the device width on the HTML5 viewport meta tag](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away?hl=en) (shown above).
4. Long tap inline magnification can be disable by setting Cordova's 'Suppresses3DTouchGesture' preference to 'true'.  
    ```xml
    <preference name="Suppresses3DTouchGesture" value="true"></preference>
    ```  
5. Global user selection can be disabled with CSS 'user-select' set to 'none' (including the usual browser prefixes (https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)). With iOS '-webkit-touch-callout' also needs to set to 'none' to disable the [touch callout](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/doc/uid/TP30001266-_webkit_touch_callout).
    ```css
    body {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default;
    }
    ```

NB: As this turns off all user selection, you might need certain elements or form inputs to allow user selection. In this case certain exceptions can be added using the _:not()_ CSS selector.

### Turbo web view performance for iOS

While there are quite a number of things you can do to improve [web page performance](http://www.html5rocks.com/en/tutorials/speed/quick/), one of the recent hybrid app performance headlines for iOS is the availability of [WKWebView which provides faster performance than the older UIWebView](http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/). Cordova supports WKWebView but there is a need to install the [WKWebView Cordova plugin](https://github.com/apache/cordova-plugin-wkwebview-engine) and set the 'CordovaWebViewEngine' preference to use 'CDVWKWebViewEngine' in Cordova's 'config.xml' file.

```powershell
cordova plugin add cordova-plugin-wkwebview-engine --save
```

```xml
<feature name="CDVWKWebViewEngine">
  <param name="ios-package" value="CDVWKWebViewEngine"/>
</feature>

<preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
```

### A couple of time saving Cordova scripts

- [Cordova app icon asset generator](https://www.npmjs.com/package/cordova-asset-generator). I also created a [ruby script for batch image resizing](https://gist.github.com/deadlyfingers/721b5495ea25a1eebd53) for generating all the app icons and launch images for iOS and Android platforms.
- [Faster Cordova web app deployment on iOS](http://www.deadlyfingers.net/mobile/faster-cordova-web-app-deployment-with-hotwire-script/) with [Hotwire IPA script](https://github.com/deadlyfingers/hotwire-ipa)

## Summary

### Responsive web design for designers

- Understanding the dynamic grid to design responsively
- Separate designs that lend themselves to a single responsive design
- The advantages of vector-based design tools

### Responsive web design for developers

- Understanding the design grid to merge separate designs
- Responsive design with multiple device testing and live reloading
- Developer web kit for responsive design

### Production of hybrid app

- Removing the unwanted web view behaviours for responsive Cordova hybrid apps
- Turn on turbo performance of Cordova hybrid apps for iOS
- Scripts to help production of Cordova hybrid apps across platforms

### References:

<a name="1">1.</a> Jason Sperling (2013) The Big Argument for Responsive Design [Online] Viget. Available: [https://www.viget.com/articles/the-big-argument-for-responsive-design](https://www.viget.com/articles/the-big-argument-for-responsive-design) [Accessed 2 May 2016]

<a name="2">2.</a> Ben Taylor (2014) Why smartphone screens are getting bigger: Specs reveal a surprising story [Online] PCWorld. Available: [http://www.pcworld.com/article/2455169/why-smartphone-screens-are-getting-bigger-specs-reveal-a-surprising-story.html](http://www.pcworld.com/article/2455169/why-smartphone-screens-are-getting-bigger-specs-reveal-a-surprising-story.html) [Accessed 2 May 2016]

<a name="3">3.</a> Ethan Marcotte (2010) Responsive Web Design [Online] A List Apart. Available:  
[http://alistapart.com/article/responsive-web-design/](http://alistapart.com/article/responsive-web-design/) [Accessed 2 May 2016]

### Additional media:

- [Responsive Design slidedeck](http://www.slideshare.net/deadlyfingers/responsive-design-from-problem-to-production) from talk at DECODED 2016 Conference in Dublin.
