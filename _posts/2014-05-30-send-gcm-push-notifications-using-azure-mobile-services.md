---
layout: post
title: Send GCM Push Notifications using Azure Mobile Services
date: 2014-05-30 11:16:52.000000000 +01:00
published: true
categories: tutorial
tags:
  - Android
  - Azure
  - Mobile Services
meta:
  dsq_thread_id: "5673434556"
comments: true
author: David Douglas
---

> Azure Mobile Services is deprecated, please migrate to Azure App Service.

### Tutorial requirements:

- [Android Studio](http://developer.android.com/sdk/installing/studio.html)
- Microsoft Azure account — start a free [Azure trial](http://aka.ms/azure_trial)
- [Google developer](http://console.develepers.google.com) account

<div class="video"><iframe src="//www.youtube.com/embed/Zx78vrELgXk" frameborder="0" allowfullscreen></iframe></div>

1. First install _Google Play Services_ package in the Android SDK Manager.  
   ![]({{ site.baseurl }}/assets/images/MS302_Android-SDK-Install-Google-APIs-Google-Play-Services.png)  
   ![]({{ site.baseurl }}/assets/images/MS301_AVD_Android-Virtual-Device-Target-Google-APIs-Push-Notifications.png)

   > NB: If using an Android Virtual Device then ensure your _Target_ is set to **Google APIs** to allow Push Notifications to work.

2. Create a new project in [Google Developers Console](http://console.develepers.google.com).  
   ![]({{ site.baseurl }}/assets/images/MS303_GoogleDevelopersConsole-Create-Project.png)
   Turn on *Google Cloud Messaging for Android*.
   ![]({{ site.baseurl }}/assets/images/MS304_Google-Project-APIs-Enable-Cloud-Messaging-for-Android.png)
   Create a new *Public API access* key.
   ![]({{ site.baseurl }}/assets/images/MS305_Google-Project-Credentials-Create-Public-API-access-key.png)
   Create a new *Server key*.
   ![]({{ site.baseurl }}/assets/images/MS306_Credentials-Create-Server-key.png)  
   ![]({{ site.baseurl }}/assets/images/MS307_Create-Server-key.png)

3. Copy the public **API key**
   ![]({{ site.baseurl }}/assets/images/MS308_Copy-Public-API-key.png)
   Paste **API key** into Mobile Service's **Push \> Google Cloud Messaging settings**
   ![]({{ site.baseurl }}/assets/images/MS309_MobileService-Push-Google-Cloud-Messaging-settings-API-key.png)
   Save changes.
   ![]({{ site.baseurl }}/assets/images/MS309_MobileService-Push-Google-Cloud-Messaging-settings-API-key.png)

4. Copy _google-play-services.jar_ (from Android SDK libs) and _notifications.jar_ (from [Azure Mobiles Services SDK for Android](https://go.microsoft.com/fwLink/?LinkID=280126&clcid=0x409)) into the Android project's **libs** folder.
   ![]({{ site.baseurl }}/assets/images/MS310_CopyPushNotificationsLibraries.png)

5. Add Push Notification permissions to the project's _AndroidManifest.xml_.
   ```xml
   <permission android:name="**my_app_package**.permission.C2D_MESSAGE"
       android:protectionLevel="signature" />
   <uses-permission android:name="**my_app_package**.permission.C2D_MESSAGE" />
   <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
   <uses-permission android:name="android.permission.GET_ACCOUNTS" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
   ```
   > NB: Replace all occurrences of _\*\*my_app_package\*\*_ with the manifest's **package** name attribute.

   ![]({{ site.baseurl }}/assets/images/MS311_AndroidManifest-AddPushNotificationsPermissions.png)
   Add the receiver block just before the application closing tag.  
   eg. _… \</application\>_
   ```
   <receiver android:name="com.microsoft.windowsazure.notifications.NotificationsBroadcastReceiver" android:permission="com.google.android.c2dm.permission.SEND">
       <intent-filter>
           <action android:name="com.google.android.c2dm.intent.RECEIVE"></action>
           <category android:name=" **my_app_package**"></category>
       </intent-filter>
   </receiver>
   ```
   NB: Replace _\*\*my_app_package\*\*_ with the manifest's **package** name attribute.  
   ![]({{ site.baseurl }}/assets/images/MS314_AndroidManifest-receiver-replace-app-package-name.png)
   NB: If you get a red text error on receiver \_notifications.NotificationsBroadcastReceiver* then add dependencies to the _build.gradle_ file and sync project libraries.

    ```conf
    dependencies {
        compile 'com.android.support:support-v4:+'
        compile 'com.google.code.gson:gson:2.2.2'
        compile fileTree(dir: 'libs', include: ['*.jar'])
    }
    ```

    ![]({{ site.baseurl }}/assets/images/MS313_AndroidStudio-build-gradle-dependencies-libs-jar-project-sync.png)

6. Copy Google **Project Number** in overview section.
   ![]({{ site.baseurl }}/assets/images/MS315_GoogleProject-Overview-copy-Project-Number.png)
   Paste value into \_ToDoActivity.java* as a String constant.

    ```java
    public static final String PROJECT_ID = "**project-number**";
    ```

    ![]({{ site.baseurl }}/assets/images/MS316_Activity-paste-Project-Number-constant.png)
    In the \_onCreate* method of _ToDoActivity.java_ add a **Notifications Manager** handler.

    ```java
    NotificationsManager.handleNotifications(this, PROJECT_ID, MyPushNotificationsHandler.class);
    ```

    ![]({{ site.baseurl }}/assets/images/MS317_NotificationsManager-handleNotifications.png)

7. Create a _Channel_ class

    ```java
    public class Channel {
        // Push Notifications - creates handle column in db table (dynamic schema)
        @com.google.gson.annotations.SerializedName("handle")
        private String mHandle;

        // Returns the handle
        public String getHandle() { return mHandle; }

        // Sets the handle
        public final void setHandle(String handle) { mHandle = handle; }

        // Item Id
        @com.google.gson.annotations.SerializedName("id")
        private String mId;

        //Returns the item id
        public String getId() { return mId; }

        //Sets the item id - @param id : id to set
        public final void setId(String id) { mId = id; }
    }
    ```

    ![]({{ site.baseurl }}/assets/images/MS318_Channel-model-class-handle-property.png)

8. Create _MyPushNotificationsHandler_ class

    ```java
    public class MyPushNotificationsHandler extends NotificationsHandler
    {
        @Override
        public void onRegistered(Context context, String gcmRegistrationId)
        {
            super.onRegistered(context, gcmRegistrationId);

            // + Support push notifications to users...
            MobileServiceClient client = ToDoActivity.getClient();
            MobileServiceTable&lt;Channel&gt; registrations = client.getTable(Channel.class);

            // Create a new Registration
            Channel channel = new Channel();
            channel.setHandle(gcmRegistrationId);

            // Insert the new Registration
            registrations.insert(channel, new TableOperationCallback&lt;Channel&gt;() {

                public void onCompleted(Channel entity, Exception exception, ServiceFilterResponse response) {

                    if (exception != null) {
                        Log.e("PushHandler", exception.getMessage());
                    } else {
                        Log.i("PushHandler", "Registration OK");
                    }
                }
            });
        }
    }
    ```

    ![]({{ site.baseurl }}/assets/images/MS319_PushNotificationsHandler-class.png)
    Tip: To auto import classes in Android Studio enable \_Add umabiguous imports on the fly*
    ![]({{ site.baseurl }}/assets/images/MS320_AndroidStudio-Auto-Import-Add-unambiguous-imports-on-the-fly.png)

9. Create new _Channel_ table in Azure Mobile Services.
   ![]({{ site.baseurl }}/assets/images/MS321_Azure-MobileServices-create-Table-Channel.png)

10. Edit TodoItem table **Script \> Insert**

    ```java
    function insert(item, user, request) {
        item.userId = user.userId;
        //request.execute();

        request.execute({
            success: function() {
                // Write to the response and then send the notification in the background
                request.respond();
                sendNotifications(item.text);
            }
        });

        // This insert script sends a push notification (with the text of the inserted item) to all channels stored in the Channel table.
        function sendNotifications(item_text) {
            var channelTable = tables.getTable('Channel');
            channelTable.read({
                success: function(channels) {
                    channels.forEach(function(channel) {

                        // Google Cloud Messaging
                        push.gcm.send(channel.handle, item_text, {
                            success: function(response) {
                                console.log('Push notification sent: ', response);
                            }, error: function(error) {
                                console.log('Error sending push notification: ', error);
                            }
                        });

                    });
                }
            });
        }
    }
    ```

    ![]({{ site.baseurl }}/assets/images/MS322_Azure-MobileServices-TodoItem-Table-Script-Insert-sendNotifications.png)  
    > This will send a push notification upon successful insert of a Todo item.*

11. Edit Channel table **Script \> Insert**

    ```java
    function insert(item, user, request) {
    //request.execute();

    // prevents duplicated channels
    var channelTable = tables.getTable('Channel');
        channelTable
            .where({ handle: item.handle })
            .read({ success: insertRegistrationIfNotFound });
        function insertRegistrationIfNotFound(existingRegistrations) {
            if (existingRegistrations.length > 0) {
                request.respond(200, existingRegistrations[0]);
            } else {
                request.execute();
            }
        }
    }
    ```

    ![]({{ site.baseurl }}/assets/images/MS323_Azure-MobileServices-Channel-Table-Script-Insert-unique-Channel-handle.png)  
    > This will prevent duplicate registrations of user and device handles.

12. In the app add a Todo item to trigger a Push Notification
    ![]({{ site.baseurl }}/assets/images/MS324_Android-app-add-todo-push-notification.png)
    > The Push Notification will appear with the Todo item text.

    ![]({{ site.baseurl }}/assets/images/MS325_Android-app-push-notification.png)
    That's all there is to it! If you wanted to take it to the next level you could use this backend Mobile Service and roll it out across other platforms like Windows Store, Windows Phone, iOS, or use cross platform tools like Xamerin or Phonegap.
    ![]({{ site.baseurl }}/assets/images/MS326_Azure-MobileService-app-platforms.png)

_For latest platform support, how to connect to other identities and push notification services check out the [Azure online docs](http://azure.microsoft.com/en-us/documentation/)._
