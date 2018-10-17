---
layout: post
title: Enabling additional Wordpress Azure websites to reuse existing MySQL database
date: 2014-04-25 11:55:04.000000000 +01:00
published: true
categories: tutorial
tags:
- Blog
- Azure
- Website
- Wordpress
meta:
  dsq_thread_id: '5720688296'
comments: true
author: David Douglas
---
> This tutorial has been deprecated. Please check the [wiki](https://blogs.msdn.microsoft.com/appserviceteam/2017/05/16/wiki-wordpress-on-app-service/) for setting up Wordpress with the new Azure App Service. 

It's super simple to create your first Wordpress blog using Microsoft Azure Websites Gallery. Getting this all up and running is extremely fast. I've uploaded a [short video](https://www.youtube.com/watch?v=__Zj9zaGKLU) and blog post showing [how to setup up a Wordpress site in Azure](http://www.deadlyfingers.net/azure/setting-up-a-wordpress-website-with-azure/) in only a couple of minutes.

<div class="video"><iframe src="//www.youtube.com/embed/__Zj9zaGKLU" frameborder="0" allowfullscreen></iframe></div>

##### But what if you want to create a second Wordpress Azure website while reusing your existing MySQL database from the first one?

![AZURE_WP201_create-multiple-wordpress-websites-using-existing-mysql-database]({{ site.baseurl }}/assets/images/AZURE_WP201_create-multiple-wordpress-websites-using-existing-mysql-database.png)

Initially when I load up the '**\*.azure-websites.net**' URL I just get a blank page (which is PHP's quiet way of letting you know something needs fixed). When you reuse the existing MySQL database then you going to need to tweak one setting in the Wordpress configuration file (**wp-config.php**). To modify this config file you will need to grab your FTP settings in your Azure website dashboard.

![AZURE_WP202_azure-websites-dashboard-ftp-upload-settings]({{ site.baseurl }}/assets/images/AZURE_WP202_azure-websites-dashboard-ftp-upload-settings.png)

Download the publish profile to get your FTP username and password. Open this file in an XML text editor to locate the '*userName*' and '*userPass*' values which are located just after the '*ftpPassiveMode*' attribute.

Once you FTP in, navigate to `site/wwwroot/` and edit the **wp-config.php** file (you may wish to download a backup first). Then change the '**table\_prefix**' value (line no. 62) from:

```php
$table_prefix = 'wp_';
```

to something like:

```php
$table_prefix = 'wp2_';
```

You should now be able to navigate to your website URL '**\*.azure-websites.net/wp-admin/**' to complete the Wordpress setup.

Also, if you want to see what this looks like in your database just open up a MySQL client to check the new Wordpress tables added using the connection settings available in your Azure Websites dashboard.

![AZURE_WP202_azure-portal-dashboard-connection-settings]({{ site.baseurl }}/assets/images/AZURE_WP202_azure-portal-dashboard-connection-settings.png)

