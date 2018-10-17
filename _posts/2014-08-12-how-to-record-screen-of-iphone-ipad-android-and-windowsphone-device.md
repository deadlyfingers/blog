---
layout: post
title: How to record screen of iPhone, iPad, Android and WindowsPhone device
date: 2014-08-12 08:27:24.000000000 +01:00
published: true
categories: tutorial
tags:
- Android
- iPad
- iPhone
- Windows Phone
meta:
  _wp_old_slug: how-to-present-and-record-screen-of-iphone-ipad-android-and-windowsphone-device
  dsq_thread_id: '5666766258'
comments: true
author: David Douglas
---
If you've developed an app you might want to make a promo video showing your app working across devices or multiple screens.

Of course you can record an iOS Simulator, Android Virtual Device, or WindowsPhone emulator easy enough using a screen recording tool like [Camtasia](http://www.techsmith.com/camtasia.html) but it's often a bit tricker to record real footage from the device hardware. Also it might be necessary to demonstrate app functionality not supported by a simulator.

<figure>
  <img src="{{ site.baseurl }}/assets/images/Camtasia-custom-region.jpg" alt="Camtasia Screen Record Custom Region">
<figcaption>Recording simulator window using Custom Region recording in Camtasia.</figcaption>
</figure>

Windows Phone 8.1 already comes with the screen projection functionality built-in. This makes Windows the easiest platform to record app interaction.

### How to present and record screen of WindowsPhone device using PC/Mac

On PC you will need Windows 8 installed. On Mac you will need a Bootcamp partition or VMware Fusion Virtual Machine with Windows 8 installed.  
The WindowsPhone should have the latest 8.1 update installed.

1. Connect the Phone over USB.
2. Open Windows Phone Settings and select "Project my screen".
3. Install the "[Project My Screen App](http://www.microsoft.com/en-gb/download/details.aspx?id=42536)" for Windows 8. ![Project My Screen app]({{ site.baseurl }}/assets/images/ProjectMyPhoneAppCapture.jpg)
4. Tap 'yes' when prompt to allow screen projection on WindowsPhone appears.

![Allow screen projection]({{ site.baseurl }}/assets/images/wp_allow_project_my_screen.jpg)

> Tip: In the Windows "Project My Screen" application press ' **F**' key to toggle fullscreen mode and ' **B**' key to hide the phone background chrome.

Unfortunately there is no way to display or record the touch gestures, but this can be dummied using Camtasia mouse effects. Simply 'mirror' with the mouse pointer what your other hand does on the device at the same time. Once the screen footage is recorded in Camtasia you can hide the mouse cursor by setting the Cursor Opacity to zero and add a Cursor Highlight effect to simulate the touch input.

* * *

### How to present and record screen of iPhone/iPad device using PC/Mac

To record an iPhone or iPad you can try out the third party [Reflector](http://www.airsquirrels.com/reflector/) app. This makes your PC/Mac act as an AirPlay device allowing you to display and record the screen.

1. Connect PC/Mac and iPhone/iPad to the same wifi network.
2. Launch Reflector application.
3. On iOS7 or higher device, swipe up from bottom of screen to open 'Control Center' to select the Reflector Airplay device and enable video 'Mirroring'.

Unfortunately there is no way to display the touch gestures, but this can be dummied using Camtasia mouse effects. Simply 'mirror' with the mouse pointer what your other hand does on the device at the same time. Then once your Reflector footage is recorded in Camtasia you can hide the mouse cursor by setting the Cursor Opacity to zero and add a Cursor Highlight effect to simulate the touch input.

* * *

### How to record screen of Android device using PC/Mac

To record an Android device without rooting your device requires an install of the Android SDK on your PC/Mac. Once your SDK Environment is setup you can run commands in the command prompt / Terminal:

1. Check Android device is connected to PC/Mac using USB connection. NB: You will have to enable 'Developer' mode on your device by tapping _Build number_ seven times (found under _Settings \> About device_). Then enable _USB debugging_ (found under new _Developer options_ settings).  
`adb devices`
2. Record screen using adb shell. NB: Requires Android 4.4 _KitKat_ (API level 19) or above.  
`adb shell
screenrecord /sdcard/recording.mp4`
3. Stop recording (Control+C) and exit shell.  
`exit`
4. Copy screen recording from device's /sdcard onto PC/Mac  
`adb pull /sdcard/recording.mp4`
5. Move / rename recording  
`mv recording.mp4 ~/Desktop/`

![Recording screen of Galaxy Note 3]({{ site.baseurl }}/assets/images/GalaxyNote3.jpg)

Unfortunately there is no way to record the touch gestures at the same time using this technique. What you can do is play the original screen recording and mimic the touch gestures over the top while recording using Camtasia.

