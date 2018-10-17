---
layout: post
title: Create an Android app with a cloud backend in minutes
date: 2014-05-27 08:39:50.000000000 +01:00
published: true
categories: tutorial
tags:
- Android
- Azure
- Mobile Services
meta:
  dsq_thread_id: '5668035858'
comments: true
author: David Douglas
---
> Azure Mobile Services is deprecated, please migrate to Azure App Service.

These days it's probably a good idea to have cloud backend for your apps. There are a greater number of connected devices in comparison to individuals, which means your apps may be expected to work as well as sync across multiple platforms as a rule.

![The number of connected devices more than number of people.]({{ site.baseurl }}/assets/images/IoT-NumberOfPeople-vs-ConnectedDevices.png) 
> The number of connected devices is more than number of people since 2008. Source: Cisco

This tutorial will show you how to create a cloud backend for an Android app, but the bigger picture would be the ability to roll this out to the other platforms as well. The idea that all the connected devices of an individual user (perhaps an iPhone, iPad, WindowsPhone and Windows device) could all tap into the same shared resources and server-side business logic in the cloud. Of course managing a cloud infrastructure or server isn't something that most app developers want to get burdened with, never mind the cost and time implications. Azure Mobile Services takes care of all that, enabling developers to focus on developing the app – making the best possible user experience.

<div class="video"><iframe src="//www.youtube.com/embed/7aEe3tFiLAY" frameborder="0" allowfullscreen></iframe></div>

I have arranged this tutorial as a three part series. Each part features a 10-15 minute video screencast to allow inclusion of additional titbits that I hope will prove useful. Please note these tutorials are recorded using Android Studio on a Mac, so bear in mind that some steps may differ slightly if you are using Android Studio for Windows or Eclipse.

## How to create an **Android app** using Azure Mobile Services tutorial parts:

1. [Create a Mobile Service in Azure]({{ site.baseurl }}{% link _posts/2014-05-28-create-mobile-service-in-azure.md %})
2. [Setup Mobile Service table permissions and authentication]({{ site.baseurl }}{% link _posts/2014-05-29-setup-mobile-service-table-permissions-and-authentication.md %})
3. [Send GCM Push Notifications using Azure Mobile Services]({{ site.baseurl }}{% link _posts/2014-05-30-send-gcm-push-notifications-using-azure-mobile-services.md %})

--- 

:memo: [Azure Mobile Services for Android cheatsheet]({{ site.baseurl }}/assets/media/AzureMobileServices-Android-GettingStarted.pdf)

