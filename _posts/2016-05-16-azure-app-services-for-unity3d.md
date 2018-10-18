---
layout: post
title: Azure App Services for Unity3D
date: 2016-05-16 15:42:13.000000000 +01:00
published: true
categories: tutorial
tags:
- Azure
- App Services
- Unity3D
meta:
  dsq_thread_id: '5662800490'
comments: true
author: David Douglas
---
[Azure Mobile Services will be migrated to App Services](https://azure.microsoft.com/en-us/blog/transition-of-azure-mobile-services/) on Sept 1st 2016. To prepare for this migration I've renamed and updated the open source [Mobile Service Unity3d projects to support **Azure App Service**](https://github.com/Unity3dAzure/AppServices) going forward.

<div class="video"><iframe src="https://www.youtube.com/embed/R8adpelztJA?ecver=2" frameborder="0" allowfullscreen></iframe></div>

# Using Azure App Services to create highscores leaderboard for Unity

To demonstrate the Azure App Service I have created a sample [Highscores demo for Unity](https://github.com/Unity3dAzure/AppServicesDemo) to insert, update and query a user's highscores. But to run the project in Unity Editor you will need to hook it up to an Azure App Service. Using an Azure account simply [create a new App Service in the Azure portal](https://portal.azure.com/), (for this demo I am using an App Service with Javascript backend). In a couple of minutes the Azure App Service should be up and running and ready to configure.

1. Open _Settings_, search for **Easy Tables** and add a **'Highscores'** table.
 ![AppService_1-EasyTables]({{ site.baseurl }}/assets/images/AppService_1-EasyTables.png)
2. Set all table permissions to allow anonymous access to start with. 
 ![AppService_2-TablePermissions]({{ site.baseurl }}/assets/images/AppService_2-TablePermissions.png)
3. Manage schema to add _Number_ column for **'score'** and _String_ column for **'userId'**
 ![AppService_3-ManageSchema]({{ site.baseurl }}/assets/images/AppService_3-ManageSchema.png)
4. Additionally, if you want to store user data or game scores you can enable authentication using Facebook, Twitter, Microsoft account or Google account. If you want to use the Facebook login in this demo you will need to [create a Facebook app](https://developers.facebook.com/docs/apps/register#create-app). Once you've created the Facebook app add the Facebook App ID and Secret to your Azure App Service Facebook Authentication settings.
 ![AppService_Auth]({{ site.baseurl }}/assets/images/AppService_Auth.png)
  Then configure the Facebook App Basic and Advanced settings with your Azure App Service URL:
 ![FacebookAppDomains]({{ site.baseurl }}/assets/images/FacebookAppDomains.png)
 ![FacebookAppSecureCanvasURL]({{ site.baseurl }}/assets/images/FacebookAppSecureCanvasURL.png)
 ![FacebookAppAdvancedSettings]({{ site.baseurl }}/assets/images/FacebookAppAdvancedSettings.png)
  If in doubt how to configure these settings check out the [Azure App Service documentation](https://azure.microsoft.com/en-gb/documentation/articles/app-service-mobile-how-to-configure-facebook-authentication/).
5. Once authentication is setup the **'Highscores'** table script can be edited to save **'userId'**categories: codermation.
 ![AppService_4-TableInsertScript]({{ site.baseurl }}/assets/images/AppService_4-TableInsertScript.png)
```js
table.insert(function (context) {
    if (context.user) {
        context.item.userId = context.user.id;
    }
    return context.execute();
});
```
6. In addition to table scripts you can also create custom APIs. In _Settings_, search for **Easy APIs** and add an example **'hello'** API.
 ![AppService_EasyAPIs]({{ site.baseurl }}/assets/images/AppService_EasyAPIs.png)
 ![AppService_EasyAPIs-hello.js]({{ site.baseurl }}/assets/images/AppService_EasyAPIs-hello.js.png)
```js
module.exports = {
    "get": function (req, res, next) {
        res.send(200, { message : "Hello Unity!" });
    }
}
```

Once you have setup Azure App Service you can update the Unity scene with your App Service **'https'** url and hit run!
