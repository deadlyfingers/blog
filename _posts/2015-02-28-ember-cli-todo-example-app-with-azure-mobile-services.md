---
layout: post
title: Ember-CLI ToDo example app with Azure Mobile Services
date: 2015-02-28 17:52:59.000000000 +00:00
published: true
categories: tutorial
tags:
- Ember-CLI
- Azure
- Mobile Services
meta:
  dsq_thread_id: '5671351678'
comments: true
author: David Douglas
---
## Background

When you create an [Azure Mobile Service](https://manage.windowsazure.com) you can download a **ToDo sample app** to help you get started on a number of platforms including Windows, iOS and Android. There are also cross platform options available with Xamarin or web app development using PhoneGap or HTML/Javascript. Recently I came across a pretty neat Javascript framework called [Ember](http://emberjs.com) for creating web apps. While you can go ahead and quickly download the [Ember Starter Kit](https://github.com/emberjs/starter-kit/archive/v1.10.0.zip) to try out some of the introductory snippets listed on the Emberjs homepage, the better option for serious development of Ember apps is to use [Ember-CLI](http://www.ember-cli.com). The Ember Command Line Interface gets you up and running with a full MVC framework and helps install project dependencies using NPM (Node Package Manager) and Bower. Having just started learning Ember-CLI myself I thought it might be useful to do a getting started tutorial showing how to hook it up with Azure Mobile Services to create a ToDo app with same functionality as the other offerings already available on the Mobile Services quick-start page.

## Prerequisites

Before you can start using Ember-CLI you will need [Node.js](http://nodejs.org) installed.

### How to install Node.js on Windows

- [node (64-bit)](http://nodejs.org/dist/v0.12.0/x64/node-v0.12.0-x64.msi)
- [node (32-bit)](http://nodejs.org/dist/v0.12.0/node-v0.12.0-x86.msi)

Alternatively you can manage multiple node versions using the latest [nvm-setup](https://github.com/coreybutler/nvm-windows/releases) Windows installer.

```shell
nvm install 0.12.0 
nvm use 0.12.0
```

See [nvm-windows](https://github.com/coreybutler/nvm-windows) for more commands.

### How to install Node.js on Mac

If you're using a Mac its better to install Node.js using NVM (Node Version Manager) rather than install as admin/sudo user. Run the following commands in Terminal:

```shell
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

```shell
# Edit bash profile 
nano ~/.bash_profile
```

```conf
export NVM_DIR="/Users/YOUR_USERNAME/.nvm" 
[-s "$NVM_DIR/nvm.sh"] && . "$NVM_DIR/nvm.sh"
```

```shell
# Loads nvm source 
~/.bash_profile
```

```shell
nvm install 0.12.0 nvm alias default v0.12.0
```

NB: In new Terminal sessions you may need to run `nvm use default`. If you want to you can add this to your bash profile to setup automatically.

```shell
nvm use default
```

Or for a specific node version:

```shell
nvm use v0.12.0
```

Once you have node installed you can check its working by getting the version:

```shell
node -v 
npm -v
```

### Installing Ember-CLI and bower

Install ember-cli, bower and phantomjs globally using the -g switch.

```shell
npm install -g ember-cli 
npm install -g bower 
npm install -g phantomjs
```

# Creating the Todo example app using Ember-CLI and Azure Mobile Services

1. Create an [Azure Mobile Service](http://bit.ly/azureportal)
2. Create example **TodoItem** table.  
 ![CreateTable-TodoItem]({{ site.baseurl }}/assets/images/CreateTable-TodoItem.png)
3. Create a new Ember-CLI app
```shell
mkdir ~/TodoApp cd ~/TodoApp ember new client cd client
```
4. Run in ember client in Browser.
```shell
ember serve
```
5. Open [http://localhost:4200/](http://localhost:4200/) in new Browser window to see web app.  
  ![welcome-to-emberjs]({{ site.baseurl }}/assets/images/welcome-to-emberjs.png)

6. Save Azure Mobile Services javascript files into `/vendor` folder.
  - [MobileServices.Web-1.2.5.js](http://ajax.aspnetcdn.com/ajax/mobileservices/MobileServices.Web-1.2.5.js)
  - [MobileServices.Web-1.2.5.min.js](http://ajax.aspnetcdn.com/ajax/mobileservices/MobileServices.Web-1.2.5.min.js)

7. Update the Broccoli file `Brocfile.js` to import `/vendor` javascripts
    {% raw %}
    ```js
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');

    var app = new EmberApp();

    app.import({
      development: 'vendor/MobileServices.Web-1.2.5.js',
      production:  'vendor/MobileServices.Web-1.2.5.min.js'
    });

    module.exports = app.toTree();
    ```
    {% endraw %}

8. Update the js hint file `.jshintrc` to recognise the `WindowsAzure` global namespace.

    ```json
    {
      "predef": [
        "document",
        "window",
        "-Promise",
        "WindowsAzure"
      ],
      "browser": true,
    ```
9. Generate `TodoItem` model, `index` controller and route. (Generating a route will also generate a Handlebars _index.hbs_ template by default).
    ```shell
    ember generate model TodoItem 
    ember generate controller index 
    ember generate route index
    ```
10. Create `azure` service. (Generating a service will also generate an _azure-service.js_ initalizer)
    ```shell
    ember generate service azure
    ```
11. Update the **services/azure.js** script with your own Mobile Service connection strings (on lines 61-62):  
    {% raw %}
    ```js
    import Ember from 'ember';

    var azureService = Ember.Object.extend({

      read : function(table){
        console.log(table + " read");
        return azureService.client().getTable(table).read().then(onComplete, onError);
        function onComplete(fulfilled){
          console.log("read items:" + fulfilled.length);
          return fulfilled;
        }
        function onError(error){
          console.log("Error reading item: " + error);
        }
      },

      insert : function(table, item, model){
        console.log(table + " insert:" + item.id + " model:" + model.length);
        return azureService.client().getTable(table).insert(item).then(onComplete, onError);
        function onComplete(fulfilledItem){
          // NB: use Ember's pushObject / unshiftObject to respect KVO!
          model.unshiftObject(fulfilledItem);
          console.log("inserted item:" + JSON.stringify(fulfilledItem) + " model:" + model.length);
          return fulfilledItem;
        }
        function onError(error){
          console.log("Error inserting item: "+error);
        }
      },

      del : function(table, item, model){
        console.log(table + " del:" + item.id + " model:" + model.length);
        return azureService.client().getTable(table).del(item).then(onComplete, onError);
        function onComplete(fulfilled){
          // NB: use Ember's removeObject to respect KVO!
          model.removeObject(item);
          console.log("deleted item:" + " model:" + model.length);
          return fulfilled;
        }
        function onError(error){
          console.log("Error deleting item: " + error);
        }
      },

      update : function(table, item){
        console.log(table + " update:" + item.id);
        return azureService.client().getTable(table).update(item).then(onComplete, onError);
        function onComplete(fulfilledItem){
          console.log("updated item:" + JSON.stringify(fulfilledItem));
          return fulfilledItem;
        }
        function onError(error){
          console.log("Error updating item: " + error);
        }
      }

    });

    //  creates static properties and methods for the class
    azureService.reopenClass({
      APPLICATION_URL : "https://MOBILE_SERVICE_URL.azure-mobile.net/",
      APPLICATION_KEY : "",
      mobileServiceClient : null,

      client : function(){
        if(this.APPLICATION_URL === "" || this.APPLICATION_KEY === "") {
          var error = "Please configure your Azure Mobile Service URL & Application KEY (app/services/azure.js 61-62)";
          alert (error);
          throw ("\n" + error);
        } else {
          if (this.mobileServiceClient == null) {
            console.log("Creating Mobile Service Client...");
            this.mobileServiceClient = new WindowsAzure.MobileServiceClient(this.APPLICATION_URL, this.APPLICATION_KEY);
          }
          return this.mobileServiceClient;
        }
      }

    });

    export default azureService;
    ```
    {% endraw %}

    When the app first loads we will need to _read_ a `table`. In this case we will _read_ the **TodoItem** table to get a list of TodoItems. When a user needs to add a Todo item we will call the _insert_ method to add an `item` into a `table` and update our Ember `model` for display. The `del` method will work the same way except the `item` will be deleted. Finally the `update` method will be used to save changes to an `item`, which in this case will be when the TodoItem is completed (stroked out).

12. Edit **models/todo-item.js** to handle todo `text` string and a `completed` boolean so tasks can be marked off:
    {% raw %}
    ```js
    import DS from 'ember-data';

    export default DS.Model.extend({
      // NB: You may not set 'id' as an attribute on your model
      text: DS.attr('string'),
      completed: DS.attr('boolean')
    });
    ```
    {% endraw %}

    The TodoItem model consists of a string property for the Todo text and a boolean property to say if the Todo item has been completed.

13. Edit **routes/index.js** and set `model` to read TodoItems table:

    {% raw %}
    ```js
    import Ember from 'ember';

    export default Ember.Route.extend({

      model: function(){
        var service = this.get('azureService');
        var table = 'TodoItem';
        console.log("service:" + service);
        return service.read(table);
      }

    });
    ```
    {% endraw %}

    As `ember serve` auto updates as you save changes you should see some activity in your Browser’s console log.

14. In the Browser’s console log you might get a refused to connect error "because it violates the following Content Security Policy directive: connect-src 'self'" that means we need to update our environment config. To fix this add the following `contentSecurityPolicy` settings to the `ENV` var in **config/environment.js** to allow connections to `*.azure-mobile.net`:

    {% raw %}
    ```js
    /* jshint node: true */

    module.exports = function(environment) {
      var ENV = {
        modulePrefix: 'client',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
          FEATURES: {
            // Here you can enable experimental features on an ember canary build
            // e.g. 'with-controller': true
          }
        },
        contentSecurityPolicy: {
          'default-src': "'none'",
          'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.azure-mobile.net",
          'font-src': "'self'",
          'connect-src': "'self' *.azure-mobile.net",
          'img-src': "'self'",
          'style-src': "'self' 'unsafe-inline'",
          'media-src': "'self'"
        },
        APP: {
          // Here you can pass flags/options to your application instance
          // when it is created
        }
      };
    ```
    {% endraw %}

15. Update the **templates/index.hbs** which will be used to display the user interface.
    {% raw %}
    ```html
    <h3> Todo: {{text}}</h3>
    <header>
    <form>
    {{input value=text type="text" name="text" placeholder="Todo" autofocus="autofocus"}}
    <input type="submit" value="Add" disabled>
    </form>
    </header><main>
    <ol>
    {{#each item in model}}
      </ol>
    <li>
        <label item>
          <input type="checkbox" disabled checked>
          <span class="item.completed">{{item.text}}
        
        <button item>Delete
      </button></span></label>
    </li>
    {{/each}}
    </main>
    ```
    {% endraw %}

    > NB: You will get an uncaught error if you try to add, update or delete items as we still need to handle user actions with a controller.

16. Update the **controllers/index.js** to handle actions from user interface and delegate them to our Azure service.
    {% raw %}
    ```js
    /* jshint node: true */

    module.exports = function(environment) {
      var ENV = {
        modulePrefix: 'client',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
          FEATURES: {
            // Here you can enable experimental features on an ember canary build
            // e.g. 'with-controller': true
          }
        },
        contentSecurityPolicy: {
          'default-src': "'none'",
          'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.azure-mobile.net",
          'font-src': "'self'",
          'connect-src': "'self' *.azure-mobile.net",
          'img-src': "'self'",
          'style-src': "'self' 'unsafe-inline'",
          'media-src': "'self'"
        },
        APP: {
          // Here you can pass flags/options to your application instance
          // when it is created
        }
      };
    ```
    {% endraw %}

    To allow access to the service from the controller we need to inject the `azureService` in the **initializers/azure-service.js** service initializer.
    {% raw %}
    ```js
    export function initialize(container, application) {
      application.inject('route', 'azureService', 'service:azure');
      application.inject('controller', 'azureService', 'service:azure');
    }

    export default {
      name: 'azure-service',
      initialize: initialize
    };
    ```
    {% endraw %}

    ![ember-cli-todo-app]({{ site.baseurl }}/assets/images/ember-cli-todo-app.png)  
    ![TodoItem-table]({{ site.baseurl }}/assets/images/TodoItem-table.png)

17. Finally add some styles to grey out and strike through completed items **styles/app.css** :
    {% raw %}
    ```css
    body {
      font-family: sans-serif;
      cursor: default;
      margin: 0;
      padding: 0;
      -webkit-user-select: none;
    }
    
    header {
      margin: 10px;
    }
    
    span {
      color: #000; /* default (incompleted todos) */
    }
    
    .completed, .true {
      color: #999; /* completed tasks are greyed and striked out */
      text-decoration: line-through;
    }
    button {
      float: right;
    }
    
    ol {
      list-style-position: inside;
      margin: 0;
      padding: 0;
      color: #999;
    }
    
    li {
      padding: 10px;
    }
    
    li:nth-child(odd) {
      background:#fcfcfc;
    }
    
    li:nth-child(even) {
      background:#f9f9f9;
    }
    
    label {
      cursor: pointer;
    }
    ```
    {% endraw %}

[![ember-cli-todo-app-style]({{ site.baseurl }}/assets/images/ember-cli-todo-app-style.png)]({{ site.baseurl }}/assets/images/ember-cli-todo-app-style.png)

[Download finished Todo ember-cli project on GitHub](https://github.com/deadlyfingers/ember-cli-todo-app-azure)

```shell
git clone https://github.com/deadlyfingers/ember-cli-todo-app-azure.git 
cd ember-cli-todo-app-azure 
npm install 
bower install 
ember serve
```
