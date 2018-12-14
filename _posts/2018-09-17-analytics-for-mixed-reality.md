---
layout: post
title: Analytics for Mixed Reality
description: Unity project showing how to log telemetry using Application Insights. Capture events for Unity UI buttons and spatial events including air tap and proximity interactions for HoloLens and Mixed Reality. With Application Insights you can follow user flow across scenes, create funnels and review user retention for your Unity project.
date: 2018-09-17 16:36:26.000000000 +01:00
published: true
categories: code
tags:
  - Application Insights
  - Ibex Dashboard
  - Data Visualisation
  - Kusto
  - Azure
  - Unity3d
  - Mixed Reality
  - HoloLens
meta:
  dsq_thread_id: "6917106927"
comments: true
author: David Douglas
icon: "chart-line"
prefix: "fas"
---

## Behind every good user experience is great analytics

If you ever designed or developed client side applications or websites you've probably integrated with an analytics service to provide telemetry data to help make informed design choices and development decisions to improve user experience and business outcomes.  
One of the key performance indicators is when you track steps or funnel operations as conversions to calculate a conversion rate for each session. You would want to know how the conversion rate can be improved upon and a good idea would be to watch out for the steps with a high bounce rate where users are dropping off. If the bounce rate is very high then there might even be a blocker or flaw in regards to the user. Either way we can understand the benefit for the collection and study of analytics which is essential for providing the insights that will help designers and developers craft better user experiences and advance product development.

# Application Insights for Unity

If you're a Unity developer or you develop in VR, AR, MR or XR you might have stuck the issue of gathering analytics onto the backlog but it should be one of the first items done so you can use it to help plan and prioritize the other features. To help you get started I've made an [Application Insights for Unity sample](https://github.com/Unity3dAzure/UnityApplicationInsights) so you can start logging telemetry in just a few minutes! All you have to do to add this to your existing Unity app or game is drop the **Unity Application Insights** script onto a Game Object, add your Application Insights **Instrumentation key** and you will be all set to record valuable user session telemetry automatically. After that all you have to do it wait around 5 mins for the telemetry to display in the **Application Insights Usage** section in Azure. You can also extend this in you own app or game to record any custom events or metrics you want to know about. But right out of the box (without any additional effort on your part) you will be able to visualize telemetry for users, sessions and user flow and their journey across the scenes of your Unity app or game. Here are just some of the visualizations already built-in to Application Insights in the Azure portal:

### User Flows

Chart user flow across Unity scene changes and split by custom or interaction events.

![Unity App Insights User Flow]({{ site.baseurl }}/assets/images/ApplicationInsights-UserFlows.png)

### Sessions

View users and events during sessions.

![Unity App Insights User sessions]({{ site.baseurl }}/assets/images/ApplicationInsights-Sessions.png)

### Funnels

Create funnels by creating step by step conditions to get conversion rates.

![Unity App Insights Conversions]({{ site.baseurl }}/assets/images/ApplicationInsights-Funnels.png)

### Retention

Review returning users over a period of time.

![Unity App Insights Retention]({{ site.baseurl }}/assets/images/ApplicationInsights-Retention.png)

## Analytics for Mixed Reality interactions

In the Unity project there is also a MR sample to show how to setup Application Insights for recording custom interaction events and metrics in a scene. To use the sample please fork or clone the [Unity Application Insights sample project](https://github.com/Unity3dAzure/UnityApplicationInsights), import the [plugins](https://github.com/Microsoft/HolographicAcademy/raw/Azure-MixedReality-Labs/Azure%20Mixed%20Reality%20Labs/MR%20and%20Azure%20309%20-%20Application%20insights/AppInsights_LabPlugins.unitypackage) and setup **Application Insights** in [Azure portal](https://portal.azure.com) if you haven't already. Once you've got that you can get up and running on HoloLens straight from the Unity Editor:

1. To view the Mixed Reality sample in HoloLens open the scene named "Scene-MR". (Make sure you've pasted in your Instrumentation key into the Application Insights game object script)
2. Connect to remote HoloLens device using **Window \> XR \> Holographic Emulation** window. Note: Requires the [Holographic Remoting Player](https://www.microsoft.com/en-us/p/holographic-remoting-player/9nblggh4sv40?activetab=pivot%3aoverviewtab) installed and open on HoloLens to get the _Remote Machine_ IP address.
3. Hit **Play** and you will start recording interaction telemetry with the holograms.

The Application Insights MR scripts will record taps, gaze time and object proximity - when users physically "visit" a hologram by moving closer to it.  
You can also create your own custom dashboard templates using [Ibex Dashboard](https://github.com/Azure/ibex-dashboard) (which is another project I helped with) and is designed for visualizing data from Application Insights using [Kusto queries](https://aka.ms/kusto).

![]({{ site.baseurl }}/assets/images/IbexDashboard-UnityMR.png)

You can add the [dashboard template for MR](https://gist.github.com/deadlyfingers/e664aaccb748be2f332f462615f6a090) shown above to visualize the telemetry for MR custom events and metrics. Check out the [readme on github](https://github.com/Unity3dAzure/UnityApplicationInsights#custom-visualization-of-unity-ui-and-mr-telemetry) for more info about installing custom Ibex Dashboard templates.
