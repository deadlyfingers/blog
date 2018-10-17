---
layout: post
title: Faster Cordova web app deployment with hotwire script
date: 2015-10-16 14:00:03.000000000 +01:00
published: true
categories: info
tags:
- Cordova
- iOS
meta:
  dsq_thread_id: '5687323726'
comments: true
author: David Douglas
---
Building for iOS can be very time consuming. Every time you make changes to a Cordova web app you need to do a `cordova build` to update the app project. Then you have to go into Xcode to debug on device. But if you don't need to make changes to native code and you only need to update web elements like HTML, Javascript, image and media files then you can save time by just updating those bits.

I've made a [Hotwire IPA](https://github.com/deadlyfingers/hotwire-ipa) bash script to replace the 'www' web app folder with the updated directory. All you need to do is create an '\*.ipa' archive and the hotwire script can quickly update it with all web app changes and deploy to device (without need to jailbreak).

## Example usage:

`sh hotwire-ipa.sh -f ~/Desktop/app.ipa -d "www" -p ~/Cordova/app/www -b ~/Cordova/app/platforms/ios/www -i`

where:  
**-f** _is the path to \*.ipa archive_  
**-d** _is the dir to delete inside app_  
**-p** _is the dir to copy in place_  
**-b** _is the dir with Cordova build plugins and scripts_

Setup and instructions for [deploying iOS app using hotwire-ipa](https://github.com/deadlyfingers/hotwire-ipa) over on GitHub.

## Time results for iOS Cordova app:

3m 09s - Each time you update web files you need to execute `cordova build ios` to stage the updates.  
0m 38s - Open in Xcode  
8m 10s - Debug from Xcode

#### Total: 11m 57s

To run the script we need to first create an Archive and export it as an \*.ipa archive in Xcode. Once this is done then future updates can be pushed using the script.  
2m 53s - Create Archive  
2m 13s - Export as .ipa  
4m 39s - Deploy to device using hotwire-ipa script with `-i` switch to install as \*.ipa instead of \*.app.

#### Total: 8m 45s (11m 54s if you include initial `cordova build ios`)

That's 3 minutes 12 seconds saved the first time if you have already done `cordova build ios` just to compile the native code, then **7 minutes 18 seconds saved** to deploy repeated web app updates.

All times recorded using [Postcard web app](https://github.com/thaliproject/postcardapp) (using 'Story\_0' branch) on MacBook 1.2 GHz Intel Core M

