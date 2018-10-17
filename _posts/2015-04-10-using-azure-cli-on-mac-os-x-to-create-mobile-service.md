---
layout: post
title: Using Azure CLI on Mac OS X to create Mobile Service
date: 2015-04-10 15:20:34.000000000 +01:00
published: true
categories: tutorial
tags: 
- Azure
- Mobile Services
- Azure-CLI
meta:
  dsq_thread_id: '5691494323'
comments: true
author: David Douglas
---
One of our startups at [MS&nbsp;Ventures](https://www.microsoftventures.com/locations/london) was looking to use the command line to manage their Azure account on Mac. If you prefer using Mac OS X Terminal or [iTerm](https://iterm2.com/downloads.html) and have an [Azure account](http://bit.ly/azureportal) then you should check out the Azure CLI tools for Mac.

 ![Azure CLI]({{ site.baseurl }}/assets/images/azure-cli.png)

## Install Azure CLI for Mac

You can either download the [Azure Command Line tools installer for Mac](http://go.microsoft.com/fwlink/?LinkId=252249) or install the Azure command line tools using **nodejs**. I have previously written a post covering [installing nodejs using NVM](http://www.deadlyfingers.net/webdev/ember-cli-todo-example-app-with-azure-mobile-services/#nodejs-mac).

```shell
npm install -g azure-cli@0.8.17
```

Test Azure command works with help:

```shell
azure -h
```

## Download Azure Publish Settings file

Sign in to your [Azure account](http://bit.ly/azureportal) and [download your **\*.publishsettings** subscription file.](http://go.microsoft.com/fwlink/?LinkID=301775)

## Import Publish Settings file

Import path to downloaded Azure Publish Settings file:

```shell
azure account import <file.publishsettings>
```

> Tip: You can drag & drop the file into Terminal instead of typing the link.

Show Azure account subscriptions:

```shell
azure account list
```

## Create Mobile Service with Azure CLI

##### Create Mobile Service _TerminalTest_:

```shell
azure mobile create TerminalTest --push "nh"
```

> You will be prompted to enter SQL admin user name and password. 
> The Mobile Service should only take a couple of minutes to provision.

##### Show Mobile Service details including _applicationUrl_ and _applicationKey_:

```shell
azure mobile show TerminalTest
```

> You will want to make a note of your _applicationUrl_ and _applicationKey_ for CRUD examples below.

##### Create Table _Items_:

```shell
azure mobile table create TerminalTest Items
```

##### Show Tables:

```shell
azure mobile table list TerminalTest
```

##### Read Table _Items_:

```shell
azure mobile data read TerminalTest Items
```

## CRUD examples with Mobile Service using **curl**

You can quickly execute Create, Read, Update and Delete operations with Mobile Services using `curl` commands. Here's a quick overview of Mobile Service CRUD operations and methods:

| Operation | Method | REST URL format |
| --- | --- | --- |
| Create / Insert | POST | https://\<service\_name\>.azure-mobile.net/tables/\<table\_name\> |
| Read / Query | GET | https://\<service\_name\>.azure-mobile.net/tables/\<table\_name\> |
| Update | PATCH | https://\<service\_name\>.azure-mobile.net/tables/\<table\_name\>/\<item\_id\> |
| Delete | DELETE | https://\<service\_name\>.azure-mobile.net/tables/\<table\_name\>/\<item\_id\> |

You will need to replace the `X-ZUMO-APPLICATION` header value below with your own Mobile Service _applicationKey_.

1. Create / Insert
    ```shell
    curl --request POST \
    --header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
    --header 'Content-Type: application/json; charset=UTF-8' \
    --data '{"text":"hello mac","complete":false}' \
    --location 'https://terminaltest.azure-mobile.net/tables/Items'
    ```

    Change the data `text` to submit a couple of items… Note you will get a JSON response with the `id` of the inserted item. This item id value is to be used in the Update and Delete examples below.

2. Read / Query
    ```shell
    curl --request GET \
    --header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
    --header 'Content-Type: application/json; charset=UTF-8' \
    --location 'https://terminaltest.azure-mobile.net/tables/Items'
    ```
3. Update
    ```shell
    curl --request PATCH \
    --header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
    --header 'Content-Type: application/json; charset=UTF-8' \
    --data '{"complete":true}' \
    --location 'https://terminaltest.azure-mobile.net/tables/Items/C9CCC7F7-4F16-4F63-8ACD-BD2DCC32F4CC'
    ```
    <figure>
    <img src="{{ site.baseurl }}/assets/images/azure_hello_mac.png" alt="azure_hello_mac" width="768" height="219" class="aligncenter size-full wp-image-6841">
    <figcaption>^ Data updates shown in Azure Mobile Service table.</figcaption>
    </figure>
4. Delete
    ```
    curl --request DELETE \
    --header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
    --header 'Content-Type: application/json; charset=UTF-8' \
    --location 'https://terminaltest.azure-mobile.net/tables/Items/C9CCC7F7-4F16-4F63-8ACD-BD2DCC32F4CC'
    ```

<p><a href="http://azure.microsoft.com/en-gb/documentation/articles/xplat-cli" target="_blank">More documentation on Azure xplat-cli</a></p>

## How to query and filter Mobile Service table data with curl

Get items marked as **`complete`**

```shell
curl --request GET \
--header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
--header 'Content-Type: application/json; charset=UTF-8' \
--location "https://terminaltest.azure-mobile.net/tables/Items?\$filter=(complete%20eq%20true)"
```

Get items starting with text **'hello'** with total count of results:

```shell
curl --request GET \
--header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
--header 'Content-Type: application/json; charset=UTF-8' \
--location "https://terminaltest.azure-mobile.net/tables/Items?\$filter=(startswith(text,'hello'))&\$inlinecount=allpages"
```

Get a collection of items in order (eg. pagination):

```shell
curl --request GET \
--header 'X-ZUMO-APPLICATION: RLKPKSRTzFUFgXqVLRPkUTOKorqRQV65' \
--header 'Content-Type: application/json; charset=UTF-8' \
--location "https://terminaltest.azure-mobile.net/tables/Items?\$orderby=text%20desc&\$skip=1&\$top=1"
```

NB: Just be aware if you use double quotes for `--location` then you must escape the dollar signs that prefix the params with a backslash (eg. **`\$`**). Single quotes don't require dollar escaping but you may have trouble encapsulating filters with quoted strings hence I have opted for double quotes in these query examples.

