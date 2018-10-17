---
layout: post
title: Unity3D Leaderboard demo using BitRave Azure plugin
date: 2014-11-26 10:37:14.000000000 +00:00
published: true
categories: tutorial
tags:
- Android
- GameDev
- iOS
- Azure
- Mobile Services
- Unity3D
meta:
  _wp_old_slug: unity3d-leaderboard-example-using-bitrave-azure-plugin
  dsq_thread_id: '5675526538'
comments: true
author: David Douglas
---

> Azure Mobile Service is now App Service, please follow the updated [tutorial for App Services for Unity3D](http://www.deadlyfingers.net/azure/azure-app-services-for-unity3d/) instead.

This is a quick Unity3D game developer tutorial showing how to save, update and query high scores stored in the Cloud using a Mobile Service and the BitRave Azure plugin.

[Watch how to create a Leaderboard in the cloud using the Unity3D BitRave plugin.](https://www.youtube.com/watch?v=KGEabheqcRA&list=UUjk0-NQz-za6C0OULRWq_Gg)  

<div class="video"><iframe src="//www.youtube.com/embed/KGEabheqcRA" frameborder="0" allowfullscreen></iframe></div>

1. To save scores in the Leaderboard table you will need to [create a Mobile Service.](http://bit.ly/azureportal)  
  ![]({{ site.baseurl }}/assets/images/Slide07.jpg)

2. [Get the BitRave plugin with Leaderboard scripts on my GitHub fork.](http://bit.ly/getbitrave)
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_00.png)

3. Create new Unity project.
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_01.png)

4. Copy contents of the BitRave Universal Plugin _Assets_ folder into your Unity3D project’s _Assets_ folder.
 ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_02.png)

5. Import [JSON.NET](http://bit.ly/bitravejson) dependancy from Unity Asset Store.
 ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_03a.png)

6. Open the _TestAzure_ scene.
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_04.png)
  Select _Main Camera_ and remove Script in the Inspector panel. (This will be replaced later.)
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_05.png)

7. Create ‘ **Leaderboard** ’ table in Azure Mobile Services.
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_06a.png)

8. Open _AzureUILeaderboard.cs_ script and replace Azure Mobile Service connection strings.
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_07.png)

9. Drag & drop _AzureUILeaderboard.cs_ script to attach it to the Main Camera.
  ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_08.png)

10. Now you're ready to play in Unity Editor add post some high scores!
 ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_09.png)
 ![Unity3D BitRave Fork with Leaderboard script demo]({{ site.baseurl }}/assets/images/Unity3D-BitRave-Azure-Leaderboard_09b.png)

In this demo project you can submit new scores, return list of all scores and update them. You can also query to show only high scores or get list of a user’s scores.

## Check it out!

[Karma Labs on Azure Mobile Services and BitRave plugin](http://blogs.msdn.com/b/cdndevs/archive/2014/09/15/how-i-used-azure-mobile-services-in-my-unity-game.aspx) in their Unity3D game development.

If you are also looking to handle user identity with Mobile Services and configure build settings for iOS and Android development I touch on this in my first [getting started with BitRave Azure plugin tutorial.](http://www.deadlyfingers.net/azure/unity3d-game-dev-with-azure-mobile-services-using-bitrave-plugin/)

Share your Unity3D [#GameDev](https://twitter.com/search?q=%23GameDev&src=typd) with [@deadlyfingers](https://twitter.com/deadlyfingers)

