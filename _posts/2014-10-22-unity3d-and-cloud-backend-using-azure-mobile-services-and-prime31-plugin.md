---
layout: post
title: Unity3d and Cloud backend using Azure Mobile Services and Prime31 plugin
date: 2014-10-22 09:46:56.000000000 +01:00
published: true
categories: tutorial
tags:
  - GameDev
  - Azure
  - Mobile Services
  - Unity3d
  - Visual Studio
  - Windows
meta:
  _edit_last: "1"
  dsq_thread_id: "5665200318"
comments: true
author: David Douglas
---

> Azure Mobile Service is now App Service, please follow the updated [tutorial for App Services for Unity3d](http://www.deadlyfingers.net/azure/azure-app-services-for-unity3d/) instead.

Unity game developers looking to publish their games on Windows Store might want to add global/local high-score leaderboards, record user achievements and level progress. For example the ability to save level progress is usually important as users tend to own more than one device and won't really like the idea of starting over again. With Azure Mobile Services it's really easy to setup a cloud backend for apps so why not use an Azure Mobile Service to provide a backend for your game? The best part is it will only take a couple of minutes to setup!

[Watch getting started with Unity Prime31 Azure plugin running on Windows](http://youtu.be/heOfOhIkCNU)

<div class="video"><iframe src="//www.youtube.com/embed/heOfOhIkCNU" frameborder="0" allowfullscreen></iframe></div>
1. [Sign-in to Azure portal](https://manage.windowsazure.com). If you don't have an Azure account yet game developers can register for the [Cloud GameDev Offer.](http://bit.ly/gamedevoffer)
2. Create Azure Mobile Service
  ![Create Mobile Service]({{ site.baseurl }}/assets/images/Slide07.jpg)
  ![Create Mobile Service]({{ site.baseurl }}/assets/images/Slide08.jpg)
  ![Create Mobile Service]({{ site.baseurl }}/assets/images/Slide09.jpg)
3. Create Demo TodoItem Table
  ![Create Mobile Service]({{ site.baseurl }}/assets/images/Slide20.jpg)
4. Get [Prime31 “Microsoft Azure Plugin”](https://prime31.com/plugins) for Windows 8 Store. (free until July 2015)
  [![Create Mobile Service]({{ site.baseurl }}/assets/images/Slide18.jpg)](https://prime31.com/plugins)
  When you click on the “Download Now” button, it will prompt you for your name/email. Submit the form to get the download link to the Unity plugin sent to your email.
5. Download & install [Microsoft Azure Mobile Services SDK.](http://go.microsoft.com/fwlink/?LinkId=257545&clcid=0x409)
  [![Install Azure Mobile Services SDK]({{ site.baseurl }}/assets/images/InstallWindowsAzureSDK.png)](http://go.microsoft.com/fwlink/?LinkId=257545&clcid=0x409)
6. Create new [Unity3d](http://unity3d.com/unity/download) project
  ![Unity3d New Project]({{ site.baseurl }}/assets/images/Slide21.jpg)
7. Download Prime31 plugin from email link and then open the ‘MetroAzure.unitypackage’ package
  ![Open Prime31 plugin package]({{ site.baseurl }}/assets/images/Slide22.jpg)
8. Import the Prime31 plugin package.
  ![Unity3d import plugin package]({{ site.baseurl }}/assets/images/Slide23.jpg)
9. Open “MetroAzure” Scene
  ![Unity3d open MetroAzure Scene]({{ site.baseurl }}/assets/images/Slide24.jpg)
10. Open “MetroAzureDemoUI.cs” Script
  ![Unity3d open MetroAzureDemoUI script]({{ site.baseurl }}/assets/images/Slide25.jpg)
11. Copy & Paste Azure Mobile Services Connection Strings (from Azure Mobile Service portal)
  ![Unity3d open MetroAzureDemoUI script]({{ site.baseurl }}/assets/images/Slide26.jpg)
  > Remember to save changes!
12. Select **File \> Build Settings** and target Windows Store platform.
  ![Unity3d Build Settings]({{ site.baseurl }}/assets/images/Slide29.jpg)
  - “Add Current” scene
  - Select “Windows Store” and “Switch Platform”
  - Select C# Solution and SDK “8.1”
13. Select **Player Settings**
  ![Unity3d Player Settings]({{ site.baseurl }}/assets/images/Slide30.jpg)
  Under “Metro Unprocessed Plugins” set:  
  **Size:**  **_1_**  
  **Element 0:**  **_P31MetroAzure.dll_**  
  Click **Build**
14. Open Windows Store build in [Visual Studio](https://go.microsoft.com/fwLink/?LinkID=257546&clcid=0x409)
  ![Windows Store build]({{ site.baseurl }}/assets/images/Slide31.jpg)
15. Open ‘Package.appxmanifest' manifest to add Internet capabilities.
  ![Windows app manifest capabilities]({{ site.baseurl }}/assets/images/Slide32.jpg)
16. If necessary open ‘Configuration Manager’ to target current PC hardware.
  ![Windows Configuration Manager]({{ site.baseurl }}/assets/images/Slide33.jpg)
  ![Windows Configuration Manager x86]({{ site.baseurl }}/assets/images/Slide34.jpg)
17. Build and run!
  ![Visual Studio]({{ site.baseurl }}/assets/images/Slide35.jpg)
  ![Unity demo]({{ site.baseurl }}/assets/images/Slide36.jpg)
  ‘Connect Azure Service’ first, then try adding some items.
  ![Azure Mobile Services Demo Table]({{ site.baseurl }}/assets/images/Slide37.jpg)
  You will see the items appear in your Azure Mobile Service ‘TodoItem’ table.

## Ready for the next level?

Check out these links which will show you how to make a leaderboard using Azure Mobile Services & Prime31:

- [Mobile Services & Prime31 Video (leaderboard)](http://channel9.msdn.com/Series/Developing-2D-3D-Games-with-Unity-for-Windows/09)
- [Mobile Services & Prime31 Blog (leaderboard)](http://davevoyles.azurewebsites.net/prime31-azure-plugin-win8-wp8-unity-games-part-2/)
- [Building Unity projects for Windows 8 and WindowsPhone 8](http://blogs.msdn.com/b/dave_voyles_for_gaming_html5_and_xbox/archive/2014/08/13/prime-31-azure-mobile-services-plugin-for-win8-amp-wp8-unity-games.aspx)

**Additional Resources:**  
http://www.slideshare.net/deadlyfingers/unity-and-azure-mobile-services

## One more thing…

Now is a great time to publish Unity games for Windows!

- [Lifetime dev centre](https://devcenterbenefits.windows.com/) means no more recurring annual developer fees!
- Take advantage of the [Unity Offer Program](http://www.wpdevcenteroffers.com) for Windows apps to qualify for developer device, Unity Asset Store Voucher, Unity3d Pro License, ID@XBox priority and more!

Share your Unity3d [#GameDev](https://twitter.com/search?q=%23GameDev&src=typd) with [@deadlyfingers](https://twitter.com/deadlyfingers)
