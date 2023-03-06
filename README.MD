

# REMEMBER
It is important to remember that to run a PWA the service worker must run using https:
To run https locally you may have an error if no certificate is installed. 
to installed a valid certificated mkcert was used.
to create a new mkcert just run mkcert localhost and a cert.pem will be created valid for localhost - see documentation in https://github.com/FiloSottile/mkcert
to run the http-server http-server is being used. see documentation https://github.com/http-party/http-server

Run application


```sh
http-server -p 8000 -S -C localhost.pem -K localhost-key.pem
```


## Folder 01-basics

Before we dive into the topics of PWAs and start creating them, I need us all to be on the same page about the concepts of promises, the fetch API, and know how to quickly spin up a server to test our applications.

Here we will cover:

- Promises
- Chained Promises
- Promise.all
- Promise.race
- Fetch API
- Gets
- Posts
- Blob Fetch
- http-server

## Folder 02-service-worker
In this folder we will touch upon specific topics regarding:

- Why build a PWA?
- How does it work?
- Basic concepts of a PWA

It is important to keep these in mind because it is common to lose focus on what a PWA is and what a hybrid application is or what the difference is with a native application.


## Folder 03-service-worker

This section provides a summary of the main listeners used within a service worker, and my goal is to teach you how and when they are invoked so that you can later use them in an application that requires this knowledge.

Among the most common listeners are:

- fetch
- sync
- install
- activate
- push

## Folder 04-offline-cache

In this example we practiced cache strategies and offline mode in PWAs. It highlights the importance of understanding how the application works in order to apply an efficient cache management strategy that provides the best possible user experience. The article discusses how to work when the application has no internet connection and how to serve files that have never been loaded in HTML. It mentions that although there are explicit strategies, they can be customized to better suit specific needs. The article covers five common strategies and then suggests implementing a blend to meet the specific needs of the application.

## Folder 05-offline-navigation

In this example we practiced online navigation in PWAS. The example allows users to access app content and navigate through it even when they don't have an internet connection. This is achieved by using service workers, which are scripts that run in the background and cache app content so that it can be accessed even when the device is offline.

When a user navigates to a page in the PWA, the service worker intercepts the request and checks if the content is available in the cache. If it is, the content is served from the cache. If it is not, the request is forwarded to the server to fetch the content.

Offline navigation in PWAs is beneficial for users who may have limited or unreliable internet connectivity, such as those in rural areas or traveling in remote locations. It also improves the user experience by allowing them to access app content instantly, without waiting for content to load.

Developers can implement offline navigation in PWAs by using tools such as Workbox, which provides a set of libraries and build tools for implementing service workers and caching strategies. By incorporating offline navigation in PWAs, developers can create highly performant and accessible apps that provide a seamless user experience, even in low-connectivity environments.


## Folder 06-twitter-clone-PWA

The excercise implements cache strategies and offline mode in PWAs. It highlights the importance of understanding how the application works in order to apply an efficient cache management strategy that provides the best possible user experience. The article discusses how to work when the application has no internet connection and how to serve files that have never been loaded in HTML. It mentions that although there are explicit strategies, they can be customized to better suit specific needs. The article covers five common strategies and then suggests implementing a blend to meet the specific needs of the application.

## Manifest.json Generators

There are many automatic generators for the manifest.json file. Here are two that I consider to be very good, and some even generate all the icons needed for the application.

You can explore them before continuing with the course, and I hope they will be useful to you as well.

- [Manifest Generator 1](https://app-manifest.firebaseapp.com/) (recommended)
- [Manifest Generator 2](https://tomitm.github.io/appmanifest/)

## 07-indexedDB

Exercise focuses on learning how to record data in a local database that works offline.

The main idea is to be able to make local recordings without an internet connection so that when we regain communication with the server, we can synchronize the locally stored records.

Sounds too good to be true? Well, it is possible to do so. Unfortunately, to work with this, we need something called indexeddb, which is somewhat complicated and not very user-friendly. However, we will still learn how to use it, and we will also focus on using an easy-to-use alternative that will solve the same problem.

- [MDN - IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)


## 08-pouchdb-todo

PouchDB is an open-source JavaScript library that provides a way to store and manage data locally within web browsers and mobile applications. It uses a NoSQL database model that enables developers to work with documents, rather than tables, and provides seamless synchronization with remote databases when internet connectivity is restored. PouchDB supports multiple data storage solutions, including IndexedDB, WebSQL, and LevelDB, and it can be used with a wide range of front-end frameworks, such as React and Angular. Overall, PouchDB offers a simple and flexible way to create offline-first applications that can work both online and offline.

- [pouchDB](https://pouchdb.com/getting-started.html)


## 09-pouchdb-manual

PouchDB training project with the following functionality:

- Creates a database called "messages".
- Defines a message object with a timestamp, username, message, and synchronization status.
- Inserts the message object into the database.
- Reads all messages from the database when offline.
- Changes the synchronization status of all objects in the database to "true".
- Deletes all records from the database one by one, but only those that are already synchronized.

## 10-twitter-clone-PWA-offline

In this sections offline posts are integrated to Folder 06. A server is included to help with the post and simulate an API. 


## 11-push-notifications

On this folder we will add to twitter clone project everything necessary to send and receive push notifications to customers subscribed to our application.

We will review from how to send to how to receive a push notification, from how to configure our backend to how to delete subscriptions that are no longer of interest to us.

Notifications in PWAs (Progressive Web Apps) are a way to send push notifications to users on desktop or mobile devices, even when the user is not actively using the PWA. These notifications appear as small pop-ups that display a message or an image, and they can be clicked to open a specific page or perform a specific action within the PWA.

Notifications in PWAs are triggered by a backend server, which sends a push notification to the user's device using the Web Push protocol. The user's browser receives the push notification and displays it to the user, even if the PWA is closed or the user is not actively using the browser.

To receive notifications, users must first grant permission for the PWA to send notifications. Once the user grants permission, the PWA can store a subscription object on the backend server that can be used to send notifications to that user's device.

Notifications in PWAs are a powerful way to engage users and keep them informed about updates or new content within the PWA. However, they should be used sparingly and with care, as too many notifications can be intrusive and annoying to users. It's important to respect the user's privacy and provide clear opt-in and opt-out options for notifications.

## 12-native-resources

Examples with native resources that mobile devices have access to. We will also understand how the new ShareAPI works, which, although currently only works on Chrome for Android, will soon be supported by other browsers.

To find more information about geolocation, we recommend using the following link:

https://love2dev.com/blog/html-geolocation/

## 13-angular-countries-PWA

Example that uses the @angular/pwa package, On this example PWA is configured usgin the official @angular/pwa documentation, which will expand its capabilities over time.

On this example a web application from scratch is built which consumes services and implemetns different caching strategies offered by this package.

The official Angular package for quickly adding PWA features to an application. Remember that you can implement the service worker as you saw in the course, simply by creating it and then adding it to the finished Angular application.

This package automates several things related to PWAs, but it still does not cover everything we saw in the course. It's up to you whether you want to implement it with @angular/pwa or manually.

Documentation:

install using ```ng add @angular/pwa```

[@angular/pwa - official documentation](https://angular.io/guide/service-worker-config)
