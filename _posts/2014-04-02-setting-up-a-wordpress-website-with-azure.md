---
layout: post
title: Setting up a Wordpress website with Azure
date: 2014-04-02 11:50:05.000000000 +01:00
published: true
categories: tutorial
tags: 
- Azure
- Blog
- Wordpress
- Website
meta:
  dsq_thread_id: '5662937642'
comments: true
author: David Douglas
---
> This tutorial has been deprecated. Please check the [wiki](https://blogs.msdn.microsoft.com/appserviceteam/2017/05/16/wiki-wordpress-on-app-service/) for setting up Wordpress with the new Azure App Service.  

<div class="video"><iframe src="//www.youtube.com/embed/__Zj9zaGKLU" frameborder="0" allowfullscreen></iframe></div>

1. Start an [Azure trial](http://aka.ms/azure_trial) or [sign-in](https://manage.windowsazure.com/) into your Microsoft&nbsp;Azure management portal.
2. Select **WEB&nbsp;SITES** and choose **NEW \> WEB&nbsp;SITE \> FROM&nbsp;GALLERY**
  ![AZURE_WP01-Azure-Website-Gallery-Wordpress]({{ site.baseurl }}/assets/images/AZURE_WP01-Azure-Website-Gallery-Wordpress.png)
3. Select **BLOGS \> WordPress**
  ![AZURE_WP02-Azure-Apps-Wordpress]({{ site.baseurl }}/assets/images/AZURE_WP02-Azure-Apps-Wordpress.png)
4. Enter unique site URL at **\*.azurewebsites.net** (you will be able to add your own domain name later). Choose MySQL database option and preferred region. Deployment Settings are optional and can be skipped.
  ![AZURE_WP03-Azure-Wordpress]({{ site.baseurl }}/assets/images/AZURE_WP03-Azure-Wordpress.png)
5. Setup your Wordpress site by visiting your Azure Website’s URL **http://\*.azurewebsites.net** in your browser.
6. To setup custom domain name URL you will have to upscale from FREE to STANDARD. In your website menu select **SCALE \> STANDARD**.
  ![AZURE_WP04-Azure-Wordpress-Custom-Domain-Name-Scale-Standard]({{ site.baseurl }}/assets/images/AZURE_WP04-Azure-Wordpress-Custom-Domain-Name-Scale-Standard.png)
7. Select **CONFIGURE \> domain names \> manage domains**
  ![AZURE_WP05-Azure-Wordpress-Manage-Domains]({{ site.baseurl }}/assets/images/AZURE_WP05-Azure-Wordpress-Manage-Domains.png)
8. Enter your custom URL. You will also need to make a note of the CNAME record **awverify.www.\*.azurewebsites.net** to verify ownership and the **IP ADDRESS** provided to update your DNS A-Record.
  ![AZURE_WP06-Azure-Wordpress-Manage-Custom-Domains-IP-Address-]({{ site.baseurl }}/assets/images/AZURE_WP06-Azure-Wordpress-Manage-Custom-Domains-IP-Address-.png)
9. Go to your domain registrar control panel to modify the domain’s DNS Records.  
Add the CNAME record **awverify.www.\*.azurewebsites.net**  
  (Note: some registrars require Canonical names to have an extra '.' at the end)
  ![AZURE_WP07-DNS-Records-Add-CNAME]({{ site.baseurl }}/assets/images/AZURE_WP07-DNS-Records-Add-CNAME-300x212.png)
10. You will also need to remove any existing A Records and replace with a new A&nbsp;Record pointing to your Azure Website’s IP Address.
  ![AZURE_WP07-DNS-Records-ARecord]({{ site.baseurl }}/assets/images/AZURE_WP07-DNS-Records-ARecord.png)
  ![AZURE_WP07-DNS-Records-Updated]({{ site.baseurl }}/assets/images/AZURE_WP07-DNS-Records-Updated.png)
11. Once your DNS changes are in sync (usually 1-2 hours), you can update the domain settings in your Azure Website’s Wordpress control panel to match your domain.
  ![AZURE_WP08-Azure-Update-Wordpress-Site-Address-URL]({{ site.baseurl }}/assets/images/AZURE_WP08-Azure-Update-Wordpress-Site-Address-URL.png)
  ![AZURE_WP08-Azure-Updated-Wordpress-Site-Address-URL]({{ site.baseurl }}/assets/images/AZURE_WP08-Azure-Updated-Wordpress-Site-Address-URL.png)
12. Finally, I would activate **Settings \> Permalinks** using one of the presets or a custom structure. This enables a number of benefits including SEO friendly URLs so your keywords can appear in the URL address bar. Also advanced users can navigate using your URL address. Tip: for huge blogs it maybe advisable to start with a number (like _%year%_ or _%post\_id%_) for speed.
  ![AZURE_WP09-Azure-Wordpress-SEO-Friendly-URLs-Permalinks]({{ site.baseurl }}/assets/images/AZURE_WP09-Azure-Wordpress-SEO-Friendly-URLs-Permalinks.png)
13. Just one more thing… It’s probably a good idea to backup your Wordpress website so you can rollback if a Wordpress update ever goes wrong. Azure BACKUPS is a new feature which automatically backs up to a STORAGE data service. When creating a new Storage component I would select a different region and set replication to ‘Locally Redundant’ which is the most cost effective option.
  ![AZURE_WP10-Azure-Backups]({{ site.baseurl }}/assets/images/AZURE_WP10-Azure-Backups.png)

Thanks [@plankytronixx](http://twitter.com/plankytronixx) for the Azure Websites bootcamp!
For custom domains checkout out the post on [advanced DNS settings for Azure Websites](http://blogs.msdn.com/b/kaushal/archive/2013/07/06/windows-azure-web-sites-how-to-configure-a-custom-domain.aspx).

