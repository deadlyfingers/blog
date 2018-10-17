---
layout: post
title: Developing a web app that behaves like a native app
date: 2015-09-11 10:09:52.000000000 +01:00
published: true
categories: info
tags:
- Android
- Cordova
- iOS
- WebApp
meta:
  dsq_thread_id: '5670288733'
comments: true
author: David Douglas
---
Like many developers out there I started out coding for the web. So you might think it would be easier to develop a web app than a native app, right? The short answer is no… but web app development is getting better and the performance gap is closing.

# Thoughts on web app vs native app development

Delivering a world-class UX is the main reason to opt for native development. Web app performance has quite some way to go especially on the vast majority of low spec devices. For example even if you get your web app running at a buttery smooth 60fps in iOS Safari, it doesn't automatically mean you get that sort of performance in an app's UIWebView.

> **iOS Tip:** Don't be content testing any web app or web UI framework in Safari and think that it works. A real web app development test is only done by running it inside an embedded WebView.

What you have to be careful off is getting sucked into some web app framework because you can get some decent results pretty quickly, but as soon as you add a little more complexity things can start to break and the speed of development will slow as a result. Whereas while native development might take longer to learn initially, after that you can start building some pretty slick apps just using the standard suite of UI components provided.

Ultimately things are getting better for web app development but probably not enough as to make native app developers want to consider switching. But with all the modern browser javascript speed optimisations and mobile devices becoming ever more powerful it's worth considering a web app where the ability to share code is most important. After all who wouldn't rather develop code once that works across mobile and desktop and leverages the extensive web developer knowledge base? So the compelling reason to build a web app is that your code should run on any screen that runs a modern browser.

# Postcard app

I've been involved with developing the [Postcard app](https://github.com/thaliproject/postcardapp) which is a web app for demoing a peer to peer web experience using the [Thali Cordova plugin](https://github.com/thaliproject/Thali_CordovaPlugin). Throughout the design, development and build process of this web app I've encountered a number of issues or pain points and thought it would be good to share the golden nuggets I've learnt while trying to develop a web app that behaves like a native app!

![Postcard app icon]({{ site.baseurl }}/assets/images/logo.png)

## Icons and splashes generator for Cordova web app

With any project I always like to start with design before I jump into development. Design is a time consuming task but some things can be automated like resizing all those app icons and splashscreens across multiple platforms. I wrote a time saving [Ruby script to build app icons and splashscreens for iOS and Android](https://gist.github.com/deadlyfingers/721b5495ea25a1eebd53#file-iconsplash-rb) with [Cordova's image filenames and sizes](http://cordova.apache.org/docs/en/5.0.0/config_ref_images.md.html). (Usage and instructions are in the [gist](https://gist.github.com/deadlyfingers/721b5495ea25a1eebd53#file-readme-md))

## Designing a web app across different screens - live!

Many web apps take advantage of node and there is a great module for designers called [BrowserSync](http://www.browsersync.io).

```shell
npm install -g browser-sync
```

BrowserSync allows you live preview all your design or code changes across multiple screens. That means you can test your web app in real-time on any browser on Mac or Windows as well as hook up the web app on iPhone, iPad or Android. Also when you interact on one screen for example following a link or scrolling the page this automatically updates everywhere else. This is a must have for any responsive design or adaptive design work!  
 ![BrowserSync demo]({{ site.baseurl }}/assets/images/BrowserSync-Demo.gif)

## Polymer 1.0 - a UI kit for web apps

For the UI design side of things I choose [Polymer 1.0](https://elements.polymer-project.org/) due to it's host of web app elements inspired by a native app's UI kit. Initially I didn't like all the custom element names, as this reminded of an Angular wild west of element names but you can quickly learn the Polymer core elements and view the documentation and source behind them. Also there is a benefit to this as it prevents the usual ‘div nest of inception’ meaning that an HTML layout can be understood at a glance.

### Getting started developing with Polymer

The trickiest thing is actually getting all the Polymer elements you need to use as these all come separately which of course makes sense later for production. But do yourself a favour and just install all the paper, iron and neon elements for no hassle development.

```shell
bower install --save PolymerElements/paper-elements 
bower install --save PolymerElements/iron-elements 
bower install --save PolymerElements/neon-animation
```

### Should I use Polymer's 'on-click' or 'on-tap' event?

There is a [300ms click delay issue](http://www.telerik.com/blogs/what-exactly-is.....-the-300ms-click-delay) that affects mobile web apps. The good news is that there is a simple fix by using the [viewport meta tag](https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag) with `width=device-width` property. But the bad news is that this trick only works in Chrome 32+ on Android.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Thankfully Polymer tries to handle this issue for you if you use the `on-tap` event however it doesn't appear to currently trigger a click on Mac Safari (using an iframe web app). So if desktop Safari compatibility is more important then you may have to stick with the standard `on-click` event until this is fixed. Or just incase you already use a ['fast click'](https://github.com/ftlabs/fastclick) javascript polyfill it may run into issues due to [click delay complications with the iOS 8 web view](http://developer.telerik.com/featured/300-ms-click-delay-ios-8/).

### Meet 'iron-list' - the UITableView for web app

Polymer's `iron-list` element is essential for scrolling large amounts of data on mobile devices. It does this by using a virtual list and recycling (20) cells to handle smooth scrolling of 1000s of items. One note of caution is that this runs fine in Safari browser but there is currently a [scrolling issue in iOS 8 WebView](https://github.com/PolymerElements/iron-list/issues/61) beyond a certain number of items. If only UIWebView would behave the same as Safari then development would run so much smoother!

## Make it feel like a native app - not a web site!

It's important to make sure things act like an app and not feel like a website thrown inside a Cordova webview. There are a couple of giveaway indicators that can be fixed, although not everything will behave perfectly.

### Disable the scrolling bounce effect

While adding the [magical web app meta tags](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) will give you full screen control in the browser it doesn't get rid of the web page scrolling spring effect common with iOS and Mac. Now while the spring effect provides a wonderful UX in a web browsing context - native app's don't spring! To disable this unwanted behaviour the first thing to do is to enable the `DisallowOverscroll` preference in [Cordova's config.xml](https://cordova.apache.org/docs/en/3.0.0/guide_platforms_ios_config.md.html).

```xml
<preference name="DisallowOverscroll" value="true"></preference>
```

If you are not using Cordova then you can disable the iOS webview scroll:

```objectivec
[[webView scrollView] setScrollEnabled:NO];
```

It's always a good idea to do a CSS reset on the `html,body` and then add the following to disable the bounce effect in the browser:

```css
html,body {
    width: 100%; 
    height: 100%; 
    padding: 0; 
    margin: 0; 
}
```

```css
/* disable webkit bounce effect in the browser */
html,body {
    overflow: hidden; 
    -webkit-overflow-scrolling: touch;
}
```

### Disable select copy/paste

Another annoying web behaviour inherited is that everything is selectable on a web page. Again a useful behaviour in a web browsing context but not so much with a web app. Besides not feeling right there is a UX issue if a user taps the 'wrong way' instead of activating a button click as expected they end up in a text selection mode. The easiest workaround is setting `user-select` to `none` on the 'body'. NB: If your web app contains form inputs then you can exclude those inputs using the `:not()` CSS selector but I find it easier to switch everything off by default.

```css
/* disable iOS text selection */
body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
}
```

The one problem you still get with iOS UIWebView is that you always get a [magnifying glass](http://stackoverflow.com/questions/9218574/get-rid-of-magnifying-glass-in-ios-web-app) when doing a long-press and unfortunately there is no simple way of disabling this without [hacking UIWebView private APIs](http://stackoverflow.com/questions/7157292/how-to-disable-the-magnifying-glass-in-uiwebview).

### Prevent scrolling nav bar when editing input

A quirk with web apps on iOS is trying to fix a nav bar so it won't scroll off the screen when editing an input or textarea that would obscure the soft-keyboard when it pops up. One trick is to position your input as high up the page as possible in order to avoid the issue. But sometimes this isn't always possible so the other option is to try a hacky workaround discussed on [<abbr title="Stack Overflow">SO</abbr>](http://stackoverflow.com/questions/13529554/prevent-scrolling-on-keyboard-display-ios-6) which also seems to work pretty well with Polymer:

```html
<textarea placeholder="Message" class="flex" on-focus="shouldFocusWithoutScrollUp"></textarea>
```

```js
Polymer({
	// hack for iOS to prevent scrolling view up when soft keyboard pops up
	shouldFocusWithoutScrollUp : function(e) {
		if( this._isiOS() ) {
    		e.target.style.webkitTransform = 'translate3d(0px,-10000px,0)'; 
    		webkitRequestAnimationFrame(function() { this.style.webkitTransform = ''; }.bind(e.target));
    	}
	},

	_isiOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
});
```

In Cordova if you want to enable Javascript focus() calls to open the soft-keyboard you can disable the `KeyboardDisplayRequiresUserAction` preference. Although bear in mind iOS8 now supports focus() calls but I found the input and keyboard can lose connection sometimes.

```xml
<preference name="KeyboardDisplayRequiresUserAction" value="false"></preference>
```

## Problems with web app when running as a native iOS app…

I encountered quite a number of problems when running a web app inside the iOS 8 UIWebView. I have listed the main issues below to watch out for with possible workarounds:  
```console
[WebActionDisablingCALayerDelegate setBeingRemoved:]: unrecognized selector sent to instance 0x174009d20
*** WebKit discarded an uncaught exception in the webView:willRemoveScrollingLayer:withContentsLayer:forNode: delegate: -[WebActionDisablingCALayerDelegate setBeingRemoved:]: unrecognized selector sent to instance 0x174009d20
```

Solution: Add body style for `-webkit-transform`. This WebView bug occurred when animating an element sliding up from the bottom of the page. It caused the animation to jump and skip frames and seemed to trigger memory warnings.

```css
body {
	-webkit-transform: translateZ(0px); /* hack for iOS8 iframe scroll issue */
}
```

* * *

```console
[46377:7026777] Received memory warning.
```

Solution: If you've tested for memory leaks then try disabling animations. If this solves the issue then try to optimise your script so that expensive business logic is called only after animations are completed.

* * *

```console
Message from debugger: failed to send the k packet
```

Solution: Keep app awake! In the app delegate enable `setIdleTimerDisabled`:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    [application setIdleTimerDisabled:YES]; // don't sleep
    return YES;
}
```

> **iOS Tip:** When testing web apps on iOS it can take so long to build and debug on device that the screen locks and the deploy fails. Use the `setIdleTimerDisabled` to keep the app alive for debugging!

* * *
