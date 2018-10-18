---
layout: post
title: Unity3d game dev with Azure Mobile Services using BitRave plugin
date: 2014-11-21 15:02:28.000000000 +00:00
published: true
categories: tutorial
tags:
  - Android
  - iOS
  - Azure
  - Mobile Services
  - Unity3d
meta:
  dsq_thread_id: "5665809124"
comments: true
author: David Douglas
---

> Azure Mobile Service is now App Service, please follow the updated [tutorial for App Services for Unity3d](http://www.deadlyfingers.net/azure/azure-app-services-for-unity3d/) instead.

This quick-start tutorial is for Unity3d game developers who would like to get a cloud backend that runs across multiple platforms (including the Unity Editor for quick testing). One of the big advantages for game devs using Unity3d is that it supports so many platforms. It's fair to say [more people own more than one device that connects to the internet](http://www.deadlyfingers.net/azure/create-android-app-with-cloud-backend-in-minutes/ "No. of connected devices greater than no. of individuals") and a lot of them can run apps and games. While the platforms and ecosystems may differ as a gamer I would like to play the same game across any device (and on any platform) and expect things to sync. Azure Mobile Services is a 'Backend as a Service' which supports multi-platform app development. In Unity the BitRave plugin for Azure Mobile Services is designed to just work on any platform that Unity supports.

[Watch getting started with Unity BitRave Azure plugin running on iOS and Android](http://youtu.be/8Rg3tDsDKVU)

<div class="video"><iframe src="//www.youtube.com/embed/8Rg3tDsDKVU" frameborder="0" allowfullscreen></iframe></div>

1. To kick off with create a Mobile Service in Azure management portal. If you don't have an Azure account yet game developers can register for the [Cloud GameDev Offer.](http://bit.ly/gamedevoffer)
   ![]({{ site.baseurl }}/assets/images/Slide07.jpg)

   > NB: A Mobile Service will only take a minute to setup and just a couple of minutes more to become active and ready to use.

2. [Download BitRave plugin.](http://bit.ly/azurebitrave)
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_00.png)

3. Create new Unity3d project.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_01.png)

4. Copy BitRave's _AzureMobileServicesUniversalPlugin/Assets_ into Unity3d project's ‘Assets’ folder.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_02.png)

5. [Get JSON.NET Unity asset](http://bit.ly/bitravejson) to enable cross platform support.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_03.png)

6. Open _TestAzure_ Scene.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_04.png)

7. Open _AzureUI.cs_ script and replace the connection strings with your own Mobile Service URL & API Key.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_05.png)

8. The BitRave demo uses Authentication with Facebook. You will need to [create a Facebook app for your Mobile Service](http://azure.microsoft.com/en-us/documentation/articles/mobile-services-how-to-register-facebook-authentication/) and copy & paste the App Id and App Secret into your Mobile Service’s **IDENTITY** Facebook section. Then [generate the Facebook Access Token](https://developers.facebook.com/tools/accesstoken/) under Facebook’s **Tools \> Access Tokens.**
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices*06a.png)
   Copy the Access Token and paste into \_AzureUI.cs* script's Access Token value.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_06b.png)

   > NB: Remember to save changes!

9. In Unity select the **Main Camera** and remove the Script in the Inspector panel.
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices*07a.png)
   Reattach the \_AzureUI.cs* script. (Drag & drop the script onto the Camera.)
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_07b.png)
   ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_07c.png)

10. Add the demo _TodoItem_ table (in Azure Mobile Service's get started section).
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_08.png)

11. Run in Unity Editor and connect to Mobile Service.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices*09a.png)
    Once logged in you can add a \_TodoItem*.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_09b.png)
    You can query or list all items.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_09c.png)
    Items can be selected to updated.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_09d.png)

12. In Unity **Build Settings** switch platform to build for iOS. I've selected _Development Build_ and _Symlink Unity Libraries_ for smaller/faster builds.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_10c.png)
    To run on the iOS Simulator edit **Player Settings** and under **Target iOS Version** menu select **Simulator SDK**
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_10d.png)

13. Open Xcode project to build & run. Rotate iOS simulator to landscape to display UI.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_11.png)
    Connect to Mobile Services by logging in to add some items.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_11b.png)
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_11c.png)

14. In Unity **Build Settings** switch platform to build for Android. I've selected _Development Build_ and _Google Android Project_.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices*12a.png)
    Edit **Player Settings** to change the **Bundle Identifier**. (This is in reverse domain name notation - for example \_net.deadlyfingers.DemoApp*)
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_12b.png)

15. Import Android project into Android Studio.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices*13a.png)
    Edit the \_AndroidManifest.xml* and change the _installLocation_ attribute to **auto**.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_13c.png)
    Build & run app. (I find the Nexus 7 tablet API 21 ARM emulator works best with Unity builds.)
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_14a.png)
    Rotate Android emulator to landscape to display UI.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_14b.png)
    Connect to Mobile Services by logging in to add some items.
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_14c.png)
    ![]({{ site.baseurl }}/assets/images/Unity3d-BitRave-AzureMobileServices_14d.png)

## One more thing to todo!

You can also record the _userId_ by adding one line of code on the server-side.

![TodoItem-Insert-userId]({{ site.baseurl }}/assets/images/TodoItem-Insert-userId.png)

Edit _TodoItem_ table **Script \> Insert**

```js
function insert(item, user, request) {
  item.userId = user.userId; // adds userId property to insert item from user object.
  request.execute();
}
```

## Score bonus points!

Check out my [Leaderboard BitRave tutorial](http://www.deadlyfingers.net/azure/unity3d-leaderboard-demo-using-bitrave-azure-plugin/) showing how to save, update and query high scores stored in the Cloud using a Mobile Service.

Share your Unity3d [#GameDev](https://twitter.com/search?q=%23GameDev&src=typd) with [@deadlyfingers](https://twitter.com/deadlyfingers)
