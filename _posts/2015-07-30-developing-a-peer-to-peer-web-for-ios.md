---
layout: post
title: Developing a peer to peer web for iOS
date: 2015-07-30 12:00:26.000000000 +01:00
published: true
categories:categories: code
tags:
- iOS
meta:
  dsq_thread_id: '5669652195'
comments: true
author: David Douglas
---
To establish peer to peer (p2p) communication on iOS devices there is an API for that known as the [Multipeer Connectivity framework](https://developer.apple.com/library/ios/documentation/MultipeerConnectivity/Reference/MultipeerConnectivityFramework/). There are a couple of things to bear in mind about this framework:

- Discovers and connects with iOS devices but will not discover devices on other platforms like Android
- Maximum number of 7 invitees (client peers)
- Will raise a prompt for user acceptance of a peer connection request

## Intro to Thali project for iOS

[Thali](https://github.com/thaliproject/Thali_CordovaPlugin) is an experimental open source p2p project that promises to enable p2p web to run on mobile devices. This is quite a big undertaking so to make life easier to begin with we can start to look at the iOS to iOS p2p connectivity story which is documented as [Thali “Story -1”](http://www.goland.org/nodetolocalp2ponthali).  
The spec will use the TCP internet standard to transport data across peers therefore all mobile devices will run a Node.js layer. In order to run Node.js on iOS we use a [Cordova plugin](https://github.com/thaliproject/Thali_CordovaPlugin) which runs [JXCore](http://jxcore.com/). This will then connect with a native TCP bridge which will relay the data over the iOS Multipeer Connectivity framework. The flow is illustrated in the diagram below:  
[![Thali flow for iOS]({{ site.baseurl }}/assets/images/iOS-ThaliFlow.png)]({{ site.baseurl }}/assets/images/iOS-ThaliFlow.png)

## How to build Thali demo for iOS

If you like playing with bleeding edge code you can build the [“Story -1” iOS dev branch](http://tiny.cc/thali-ios). (NB: You will need two iOS devices with Bluetooth 4.0 support.)

To run this build script in Terminal you will need Node.js. If you haven't already got Node.js installed you can [get Node.js with <abbr title="Node Version Manager">NVM</abbr> for Mac OS X.](http://www.deadlyfingers.net/webdev/ember-cli-todo-example-app-with-azure-mobile-services/#nodejs-mac)

Install the Cordova package:

```shell
npm install -g cordova
```

Build Thali “Story -1” demo for iOS:

```shell
#!/bin/bash
HOME_DIR="Code"
PROJECT_DIR="ThaliTest-1-ios"
mkdir -p ~/$HOME_DIR
cd ~/$HOME_DIR
cordova create ~/$HOME_DIR/$PROJECT_DIR com.test.thalitest ThaliTest
cd $PROJECT_DIR
cordova platform add ios
cordova plugin add https://github.com/thaliproject/Thali_CordovaPlugin.git#story-1-dadougla
# copy sample 'www' dir 
cp -a -R -v plugins/org.thaliproject.p2p/sample/ios/www ./
# build iOS project
cordova build
# open iOS project in Xcode
open platforms/ios/ThaliTest.xcodeproj
```

## How all the parts work inside the Xcode project…

There are three main parts or layers in the Thali iOS project:

1. ### Cordova
  - All demo UI code is handled by "thali\_main.js" script.
2. ### JXCore
  - UI actions will trigger a call to functions in "app.js" script which is responsible for running all our Node.js code and calling the native methods as documented in the [Thali common API.](https://github.com/thaliproject/Thali_CordovaPlugin/blob/story_0_matthewp/doc/api/connectivity.md)
3. ### Native Plugins
  - All native methods called from JXCore are registered in "THEAppContext.m" `defineJavaScriptExtensions` method

## What about Android p2p?

Morecategories: code about Thali for Android is available on [Dr Jukka's blog](http://www.drjukka.com/blog/wordpress/?p=140).

## What about iOS and Android p2p?

Morecategories: code about future Thali development including iOS and Android p2p interoperability is documented on [Thali stories](http://thaliproject.org/stories).

