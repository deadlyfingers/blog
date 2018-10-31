---
layout: post
title: Azure Mobile Services for Unity3d
date: 2015-09-25 11:30:26.000000000 +01:00
published: true
categories: tutorial
tags:
  - Mobile Services
  - Unity3d
meta:
  dsq_thread_id: "5662906094"
comments: true
author: David Douglas
---

## State of play

If you've followed my previous Unity3d Azure tutorials I've covered two well known Unity Azure plugins - [Prime31](http://www.deadlyfingers.net/azure/unity3d-and-cloud-backend-using-azure-mobile-services-and-prime31-plugin/) and [Bitrave](http://www.deadlyfingers.net/azure/unity3d-game-dev-with-azure-mobile-services-using-bitrave-plugin/). Bitrave had better multi-platform support, however it required the 'JSON.NET' paid asset to support iOS and Android. But then there was issues with iOS <abbr title="Ahead Of Time">AOT</abbr> compiler. Because of this I decided to start a new [Azure Mobile Services library for Unity3d](https://github.com/Unity3dAzure/) to support multi-platforms like Unity3d - iOS, Android and Windows without need for paid plugins.

## Using Azure Mobile Services in Unity3d

You can drop the [Unity3dAzure library](https://github.com/Unity3dAzure/MobileServices)into your existing Unity project or try out the [demo project](https://github.com/Unity3dAzure/MobileServicesDemo) to get started.

## Getting started

1. [Download the Unity3d Azure demo project](https://github.com/Unity3dAzure/MobileServicesDemo/archive/master.zip) or use git to clone the project:

    ```
    git clone https://github.com/Unity3dAzure/MobileServicesDemo.git
    ```

2. [Create a Mobile Service](https://manage.windowsazure.com/)

    - Create 'Highscores' table for app data
    - Modify 'Highscores' table Insert node script to save userId
    - Create a custom API called 'hello'

3. In Unity3d **open scene** `Scenes/HighscoresDemo.unity`

    - Check the Demo UI script is attached to the Camera. (The script can be attached by dragging & dropping the `Scripts/HighscoresDemoUI.cs` script unto the Scene's 'Main Camera' in the Hierarchy panel.)

4. Paste Azure Mobile Service app's connection strings into Unity Editor Inspector fields (or else directly into script `Scripts/HighscoresDemoUI.cs`)

    - Mobile Service URL
    - Mobile Service Application Key

5. If you want to save score with userId then [create Facebook app](https://developers.facebook.com/apps/async/create/platform-setup/dialog/)

    - Fill in Azure Mobile Service's Identity \> Facebook settings (App Id & App Secret)
    - Paste [Facebook access user token](https://developers.facebook.com/tools/accesstoken/) into Unity Editor Inspector field (or else directly into `Scripts/HighscoresDemoUI.cs`)  
      Play in UnityEditor

## Credits

Special thanks to [Jason Fox](https://twitter.com/jasongfox) and [Bret Bentzinger](https://twitter.com/awehellyeah) who put together the [UnityRestClient](https://github.com/ProjectStratus/UnityRestClient) library using the [JsonFX plugin](https://bitbucket.org/TowerOfBricks/jsonfx-for-unity3d-git/overview).
