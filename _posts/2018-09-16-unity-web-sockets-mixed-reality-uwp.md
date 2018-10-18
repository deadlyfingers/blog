---
layout: post
title: Unity Web Sockets for Mixed Reality
date: 2018-09-16 13:17:16.000000000 +01:00
published: true
categories: code
tags:
  - Unity3d
  - UWP
  - Web Sockets
  - Mixed Reality
  - HoloLens
meta:
  dsq_thread_id: "6916719721"
comments: true
author: David Douglas
---

Certain cloud services may offer a Web Socket streaming connection as an alternative to firing repeated REST requests or polling. To make working with REST APIs in Unity more convenient I built a [REST client for Unity](https://github.com/Unity3dAzure/RESTClient) based on [UnityWebRequest](https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest.html) which supports abstract types for JSON / XML serialisation. But given a real-time scenario like "speech to text" using a Web Socket client instead of REST gives an option to stream the audio data and get intermediate results back which provides responsive feedback to users for an improved user experience.

###### Using Bing Speech API as an example we can see some limitations of using REST API versus the Web Socket protocol:

| Bing Speech                            | REST    | Web Socket         |
| -------------------------------------- | ------- | ------------------ |
| Audio stream duration                  | 15 secs | 180 secs - 10 mins |
| Stream audio with intermediate results | No      | Yes                |

Also when it comes to client app development in Unity there are a couple of very useful message events you receive from the WebSockets server:

- **End-of-speech detection** so you stop recording on client device.
- **Phrase detection** so you can pass phrases to [natural language understanding services (LUIS)](https://www.luis.ai/) model.

To use Web Sockets in Unity you can use the [WebSocket-Sharp library](https://github.com/sta/websocket-sharp), but this only supports the Unity Editor and the mono target platforms. In order to use Web Sockets when targeting Windows Mixed Reality headsets you have to use Universal Windows Platform (UWP) APIs like [MessageWebSocket](https://docs.microsoft.com/en-us/uwp/api/windows.networking.sockets.messagewebsocket). To make things easier I have created a common [Unity Web Socket](https://github.com/Unity3dAzure/UnityWebSocket) interface to use WebSocket-Sharp inside the Editor and mono platforms and then use `MessageWebSocket` when targeting the Windows Store App platform for MR headsets.

### Unity Web Socket interface

| API                     | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| ConfigureWebSocket(url) | Configures web socket with url and optional headers            |
| ConnectAsync()          | Connect to web socket                                          |
| CloseAsync()            | Close web socket connection                                    |
| SendAsync(data)         | Send binary byte[] or UTF-8 text string with optional callback |
| IsOpen()                | Check if web socket status is open                             |
| Url()                   | Return the URL being used by the web socket                    |

### Interface events

```csharp
OnError(object sender, WebSocketErrorEventArgs e);
OnOpen(object sender, EventArgs e);
OnMessage(object sender, WebSocketMessageEventArgs e);
OnClose(object sender, WebSocketCloseEventArgs e);
```

If you are interested in the example above there I have also prepared a [Unity Web Socket demo project](https://github.com/Unity3dAzure/UnityWebSocketDemo) to show Bing Speech service to LUIS for controlling scene game objects using natural speech commands for Mixed Reality scenarios.
