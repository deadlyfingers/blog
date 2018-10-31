---
layout: post
title: Setup Mobile Service table permissions and authentication
date: 2014-05-29 11:16:17.000000000 +01:00
published: true
categories: tutorial
tags:
  - Android
  - Azure
  - Mobile Services
meta:
  dsq_thread_id: "5664055320"
comments: true
author: David Douglas
---

> Azure Mobile Services is deprecated, please migrate to Azure App Service.

### Tutorial requirements:

- [Android Studio](http://developer.android.com/sdk/installing/studio.html)
- Microsoft Azure account — start a free [Azure trial](http://aka.ms/azure_trial)
- [Twitter](https://twitter.com) account

<div class="video"><iframe src="//www.youtube.com/embed/ige5xpDsJuk" frameborder="0" allowfullscreen></iframe></div>

This article builds on top of the [previous tutorial](http://www.deadlyfingers.net/azure/create-mobile-service-in-azure) where an Android Todo app was created with Azure Mobile Services. However most steps can be adapted for any Mobile Services Android app.

1. Edit _TodoItem_ table **insert** permissions to _Only Authenticated Users_.  
   ![]({{ site.baseurl }}/assets/images/MS201_TablePermissions-OnlyAuthenticationUsers.png)
2. [Create twitter app](http://apps.twitter.com).  
   ![]({{ site.baseurl }}/assets/images/MS202_TwitterApps-CreateNewApp.png)

   Copy \_Mobile Service URL* from Azure Mobile Service Dashboard  
   ![]({{ site.baseurl }}/assets/images/MS203_CopyMobileServiceURL.png)

   Paste the Azure \_Mobile Service URL\* into Twitter app's _Website_ and _Callback URL_ fields and save. Then in _Settings_ tab tick the _‘Allow this application to be used Sign in with Twitter’_ checkbox.  
   ![]({{ site.baseurl }}/assets/images/MS204_AllowThisAppToSignInWithTwitter.png)

3. In Twitter app's API Keys tab copy the _API key_ & _API secret_.  
   ![]({{ site.baseurl }}/assets/images/MS205_CopyTwitterAPIKeyAndSecret.png)

   And paste them into **Identity \> Twitter settings**.
   ![]({{ site.baseurl }}/assets/images/MS206_PasteTwitterAPIKeyAndSecret-AzureIdentity.png)

4. In **Android Studio** _ToDoActivity_ cut the code block under the new Mobile Service client.  
   ![]({{ site.baseurl }}/assets/images/MS207_CreateTableMethod.png)

   And paste into a new method \_createTable()\*.  
   ![]({{ site.baseurl }}/assets/images/MS208_CreateTableMethod.png)

5. Replace the code block with a new _authenticate()_ method.
   ```java
   private void authenticate() {
     mClient.login(MobileServiceAuthenticationProvider.Twitter, new UserAuthenticationCallback() {
       @Override
       public void onCompleted(MobileServiceUser mobileServiceUser, Exception e, ServiceFilterResponse serviceFilterResponse) {
         if (e==null)
         {
           createAndShowDialog(String.format("You are signed in as %s"), mobileServiceUser.getUserId() );
         }
         else
         {
           createAndShowDialog(e.getMessage(),"Error");
         }
       }
     });
   }
   ```
   Then build and run  
   ![]({{ site.baseurl }}/assets/images/MS209_AuthenticateMethod-BuildandRun.png)
6. Sign-in with Twitter.  
   ![]({{ site.baseurl }}/assets/images/MS210_TwitterSignIn.png)
7. You can record the _userId_ on the server-side. Edit table **Script \> Insert**
   ```js
   function insert(item, user, request) {
     item.userId = user.userId;
     request.execute();
   }
   ```
   ![]({{ site.baseurl }}/assets/images/MS211_TodoItem-Script-Insert-UserId.png)
8. Add another Todo item in the app.  
   ![]({{ site.baseurl }}/assets/images/MS212_Add-TodoItem-UserId.png)
   Refresh the *ToDoItem* table to see the new item with _userId_.  
   ![]({{ site.baseurl }}/assets/images/MS213_Browse-TodoItem-userId-Refresh.png)
9. Now change **Script \> Read** so app shows only the authenticated user's items.  
   ![]({{ site.baseurl }}/assets/images/MS214_TodoItem-Table-Script-Read-where-userId.png)

    ```js
    function read(query, user, request) {
      query.where({ userId: user.userId });
      request.execute();
    }
    ```

10. Refresh app to see changes.  
    ![]({{ site.baseurl }}/assets/images/MS215_Refresh-Todo-Items.png)
    The list should only show ToDo items that belong to that user now.
    ![]({{ site.baseurl }}/assets/images/MS216_Refresh-Todo-Items.png)

Impressive - with just a couple of lines of code the app is updated to enable user authentication and handle identity requests.

Azure Mobile Services also allows you to send Push Notifications which is covered in the [next tutorial]({{ site.baseurl }}{% link _posts/2014-05-30-send-gcm-push-notifications-using-azure-mobile-services.md %}).
