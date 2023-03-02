

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

- https://app-manifest.firebaseapp.com/ (recommended)
- https://tomitm.github.io/appmanifest/
