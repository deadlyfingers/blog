---
layout: post
title: Custom Vuforia VuMarks to identify and monitor IoT Devices with HoloLens
description: How to use a VuMark to encode a 32 character GUID string to identify a IoT Device Id with HoloLens using Azure Functions and IoT Hub.
date: 2018-09-24 15:47:27.000000000 +01:00
published: true
categories: code
tags:
  - IoT
  - HoloLens
  - Mixed Reality
  - VuForia
  - VuMark
  - Data Visualisation
meta:
  _wp_old_slug: custom-vuforia-vumarks-to-identify-iot-device-ids-with-hololens
  dsq_thread_id: "6931761484"
comments: true
author: David Douglas
---

Some of the most popular experiences of Augmented or Mixed Reality are currently in a gaming or an immersive 3D form. But what makes headsets like the HoloLens so different and special is the ability to still see into the physical world. It is this link that opens up so many new opportunities and future possibilities of spatial computing. An interesting scenario is using HoloLens to interact with IoT devices in the real world. Just by gazing at devices around a room imagine you could identify a specific IoT device to review its real-time telemetry and control it over the air!

## Setting up some sample IoT devices to interact with...

To test out this scenario the first thing we need here is access to some IoT devices to identify. In our case and for sake of simplicity we use some simulated IoT devices using the [Azure IoT Solution Accelerators](https://www.azureiotsolutions.com/Accelerators) **Remote Monitoring** sample which you can try out.

![]({{ site.baseurl }}/assets/images/Azure-IoT-000-Solution-Accelerators.png)

![]({{ site.baseurl }}/assets/images/Azure-IoT-002-launch-.png)

Once the Azure IoT Remote Monitoring solution is provisioned and ready you can select it to review a list of devices. This provides us with the list of Device Name Ids we will use to generate the VuForia VuMarks in the next steps.

![]({{ site.baseurl }}/assets/images/Azure-IoT-003-devices.png)

## Identifying IoT devices in the real-world using VuForia VuMarks

The second thing we need is to be able to identify each IoT device in HoloLens. One approach we tried during a HoloLens hack was to use [Vuforia VuMarks](https://library.vuforia.com/features/objects/vumark.html) to identify each device. A VuMark template contains a particular type of encoded data; numeric, string or raw bytes. Initially I tried out the [default numeric type VuMarks](https://library.vuforia.com/content/dam/vuforia-library/docs/target_samples/unity/mars_vumarks.pdf) from the [VuForia Samples](https://library.vuforia.com/content/vuforia-library/en/articles/Solution/sample-apps-target-pdfs.html) to check everything was working before trying anything more complex. Bear in mind there will also be a number of physical and environmental factors including VuMark placement, size and lighting conditions in the area to test and consider.  
**Tip:** I found it useful to test the VuMarks by saving all the generated images on my iPhone and testing them in the Unity Editor using the built-in web cam.

### Creating a custom VuMark

I used the [VuForia VuMark Illustrator template](https://library.vuforia.com/articles/Solution/Designing-a-VuMark-in-Adobe-Illustrator.html) to create a custom VuMark. In my case I wanted to a support a **32 character length string** to contain a GUID so I created a string type VuMark with **280 data elements**. To save time designing your own VuMark you can download my finished [custom GUID VuMark SVG]({{ site.baseurl }}/assets/media/guidVumark.svg). If you want to create your own VuMark I've included a list of VuMark element requirements below so you can get an idea of how complex the design would need to be and compare how many elements are required for each data type:

| Id length | String elements required | Byte elements required |
| --------- | ------------------------ | ---------------------- |
| 1         | 35                       | 40                     |
| 4         | 56                       | 64                     |
| 8         | 84                       | 96                     |
| 10        | 98                       | 112                    |
| 11        | 112                      | 120                    |
| 12        | 119                      | 128                    |
| 14        | 133                      | 144                    |
| 16        | 147                      | 160                    |
| 18        | 161                      | 176                    |
| 20        | 182                      | 208                    |
| 22        | 196                      | 224                    |
| 24        | 210                      | 240                    |
| 32        | **280**                  | 320                    |
| 48        | 406                      | 464                    |
| 64        | 546                      | 624                    |
| 100       | 840                      | 928                    |

| Maximum numeric Id | Numeric elements required |
| ------------------ | ------------------------- |
| 9                  | 28                        |
| 99                 | 31                        |
| 999                | 34                        |
| 9999               | 38                        |
| 9 x5               | 41                        |
| 9 x6               | 50                        |
| 9 x7               | 54                        |
| 9 x8               | 57                        |
| 9 x9               | 60                        |
| 9 x10              | 64                        |
| 9 x11              | 67                        |
| 9 x12              | 70                        |
| 9 x13              | 74                        |
| 9 x14              | 77                        |
| 9 x15              | 80                        |
| 9 x16              | 84                        |
| 9 x17              | 87                        |
| 9 x18              | 90                        |
| 9 x19              | 94                        |

For more info on designing VuMarks you can [download the VuMark design guide](https://developer.vuforia.com/sites/default/files/VuMark%20Design%20Guide.pdf) or [view design guide docs](https://library.vuforia.com/articles/Training/VuMark-Design-Guide). I also found the [video explaining the VuMark design process](https://www.youtube.com/watch?v=YXMiDRyvqzk) to be most helpful. NB: To design your own custom VuMarks you will need [Adobe Illustrator](https://www.adobe.com/uk/products/illustrator.html) to run the [VuMark template scripts](https://developer.vuforia.com/vui/auth/login?url=/downloads/tool%3Fd%3Dwindows-4851025-17-4124%26retU).

**Illustrator / VuMark Scripts troubleshooting notes:**

- You may have to restart Illustrator after copying the scripts into the `C:\Program Files\Adobe\Adobe Illustrator CC 2018\Presets\en_US\Scripts` directory.
- If you hit an error when setting up a new VuMark using the [Illustrator scripts v6.0.112](https://developer.vuforia.com/vui/auth/login?url=/downloads/tool%3Fd%3Dwindows-4851025-17-4124%26retU) then check you have Adobe's [Myriad Pro fonts installed](https://developer.vuforia.com/forum/vumark-design-tools/errors-illustrator-scripts#comment-55448).
- If you can't see the Illustrator canvas or the document area is blank or black then you might have to disable GPU acceleration under Preferences \> Performance.

### Creating custom VuMark database for Unity

Once you've designed your custom VuMark in Illustrator and it passes all the tests you will be ready to export your VuMark Template artwork. If you don't have your own design ready you can [download my GUID VuMark SVG artwork]({{ site.baseurl }}/assets/media/guidVumark.svg).

![]({{ site.baseurl }}/assets/images/VuMark-Creation-Illustrator-280-elements-32-string.png)

**Note:** If you're starting a new design it's preferable to avoid rotational symmetry in your VuMark's border or contour otherwise you will have some additional work to do, as well as this the validation scripts don't seem to provide a clear indication if this is completed correctly. You might also notice the Border and Clear Space width is only shown as "VERIFY" status - this check is left to the designer to manually check that the magenta overlay around the VuMark contour falls within the border and clear space boundary.

1. If you haven't used VuForia before you will have to create a developer account and get a free license key for development in Unity.
   ![]({{ site.baseurl }}/assets/images/VuForia-Developer-License-Key.png)
2. Create a new VuMarks database.
   ![]({{ site.baseurl }}/assets/images/VuForia-Database.png)
3. Upload the [custom VuMark SVG artwork file]({{ site.baseurl }}/assets/media/guidVumark.svg) into your VuMark database. **Note:** You should set the width of the VuMark in relation to Unity's unit of measurement which is in **meters**. In my case I want to recognize the VuMark on my iPhone which is 6 cm wide therefore I use a value of " **0.06**" m.
   ![]({{ site.baseurl }}/assets/images/VuMark-Upload-Export-SVG.png)
4. Select your VuMark template target to **download** as your VuMark database.
   ![]({{ site.baseurl }}/assets/images/VuForia-VuMark-Database.png)
5. Download database for **Unity Editor**.
   ![]({{ site.baseurl }}/assets/images/VuForia-Unity-Database.png)
6. **Import** your VuMarks database package into Unity project. If you don't have your own Unity project you can setup the [Mixed Reality IoT Monitoring sample](https://github.com/deadlyfingers/MixedRealityIoTMonitoring) to get started.
   ![]({{ site.baseurl }}/assets/images/Unity-Import-VuMarks-Package.png)
7. In Unity scene check the VuMark Behavior is setup correctly with your custom **VuMark Database and Template** and has **Extended Tracking** enabled for Mixed Reality.
   ![]({{ site.baseurl }}/assets/images/Unity-VuMark-Behaviour.png)
8. Open the VuForia AR Camera configuration settings to enter your **VuForia developer license key** and to **load and activate the VuMark database**.
   ![]({{ site.baseurl }}/assets/images/VuForia-ARCamera-Config.jpg)
9. Generate the VuMark images for each Device Id you want to recognize.
   ![]({{ site.baseurl }}/assets/images/VuForia-Generate-VuMark-GUID.png)

For my sample IoT devices I generated the following device Ids; "chiller-01.0", "chiller-02.0", "elevator-01.0", "elevator-02.0", "furnace-01.0".

<div class="grid-x">
  <div class="small-6 cell">
    <img src="{{ site.baseurl }}/assets/images/guidVumark_chiller-01.0.png" alt="chiller-01.0"/>
  </div>
  <div class="small-6 cell">
    <img src="{{ site.baseurl }}/assets/images/guidVumark_chiller-02.0.png" alt="chiller-02.0"/>
  </div>
  <div class="small-6 cell">
    <img src="{{ site.baseurl }}/assets/images/guidVumark_elevator-01.0.png" alt="elevator-01.0"/>
  </div>
  <div class="small-6 cell">
    <img src="{{ site.baseurl }}/assets/images/guidVumark_elevator-02.0.png" alt="elevator-02.0"/>
  </div>
  <div class="small-6 cell">
    <img src="{{ site.baseurl }}/assets/images/guidVumark_furnace-01.0.png" alt="furnace-01.0"/>
  </div>
</div>

**Tip:** Save the generated VuMark images to iPhone / Android to test with. (I just saved the generated VuMark PNG images to my [OneDrive](https://onedrive.live.com/) images folder to sync onto my iPhone.)

## Running the sample Mixed Reality IoT Monitoring Unity project

To run the [Mixed Reality IoT Monitoring Unity project](https://github.com/deadlyfingers/MixedRealityIoTMonitoring) you will also need to setup the Azure Function APIs to get the device data from the Azure IoT Remote Monitoring sample.

### Azure IoT Device Functions (Nodejs backend)

1. Fork the [Azure IoT Device Functions project](https://github.com/deadlyfingers/IoTDeviceFunctions) on github.
2. Sign in to your [Azure portal](https://portal.azure.com)
3. Create a new Azure Function. NB: Ensure your **Function app settings** is using **version 2**
4. Add the following environment variables using your **Azure Function app settings** :

   - IOTHUB_CONNECTION_STRING
   - TSI_FQDN
   - AD_APP_ID
   - AD_APP_KEY
   - AD_TENANT_DOMAIN NAME "\*.onmicrosoft.com"

5. To deploy your Function app select **Platform Features \> Deployment Options \> Setup \> GitHub** and choose your forked repo.

## Next steps...

Using VuForia VuMarks we are able to identify an IoT device using a HoloLens. Then using the recognized device Id as a param we can poll an Azure Functions endpoint to return the device's telemetry. The next steps in this scenario would be to add buttons to call methods listed in the device's payload.
