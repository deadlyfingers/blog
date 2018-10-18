---
layout: post
title: Create a Mobile Service in Azure
date: 2014-05-28 11:11:43.000000000 +01:00
published: true
categories: tutorial
tags:
  - Android
  - Azure
  - Mobile Services
meta:
  dsq_thread_id: "5662810263"
comments: true
author: David Douglas
---

> Azure Mobile Services is deprecated, please migrate to Azure App Service.

### Tutorial requirements:

- [Android Studio](http://developer.android.com/sdk/installing/studio.html)
- Microsoft Azure account — start a free [Azure trial](http://aka.ms/azure_trial)

<!-- video tutorial -->
<div class="video"><iframe src="//www.youtube.com/embed/EV6DPafCntA" frameborder="0" allowfullscreen></iframe></div>

1. Create a new Mobile Service in [Azure](https://manage.windowsazure.com/).
   ![]({{ site.baseurl }}/assets/images/MS101*CreateNewMobileService.png)  
   ![]({{ site.baseurl }}/assets/images/MS102_CreateNewMobileService.png)  
   \_The wizard will take you through this process in a couple of steps. Once the mobile service is created it will only take a couple of minutes to start up before its ready to use.*

2. Create Todo Table.
   ![]({{ site.baseurl }}/assets/images/MS103_MobileService-CreateTodoTable.png)

3. Download Todo App.
   ![]({{ site.baseurl }}/assets/images/MS104_MobileService-DownloadToDoApp.png)

4. Extract the Eclipse project archive and _Import Project_ in **Android Studio**.
   ![]({{ site.baseurl }}/assets/images/MS105*ImportProject-AndroidStudio.png)  
   \_The project may take a while to import while Gradle syncs the libraries.*

5. Build and run!
   ![]({{ site.baseurl }}/assets/images/MS106_AndroidStudio-Build-and-Run.png)

6. Add ToDo item and then browse the TodoItem Table in Azure Mobile Services.
   ![]({{ site.baseurl }}/assets/images/MS107_AndroidStudio-Build-and-Run.png)  
   ![]({{ site.baseurl }}/assets/images/MS108_MobileServices-Browse-TodoItem-Table.png)

### Cool! You just built an Android app with a cloud backend in minutes :)

Now you can add table permissions and setup authentication using Twitter in the [next tutorial]({{ site.baseurl }}{% link _posts/2014-05-29-setup-mobile-service-table-permissions-and-authentication.md %}).
