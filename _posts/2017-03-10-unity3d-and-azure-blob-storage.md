---
layout: post
title: Unity3d and Azure Blob Storage
date: 2017-03-10 11:14:11.000000000 +00:00
published: true
categories: tutorial
tags:
  - Azure
  - Blob Storage
  - Unity3d
meta:
  dsq_thread_id: "5662807180"
comments: true
author: David Douglas
---

Previously I've looked at using [Azure App Services for Unity](http://www.deadlyfingers.net/azure/azure-app-services-for-unity3d/), which provided a backend for Unity applications or games using Easy Tables and Easy APIs. But what if I wanted to lift and shift heavier data such as audio files, image files, or Unity Asset Bundles binaries? For storing these types of files, I would be better using [Azure Blob storage](https://azure.microsoft.com/en-gb/services/storage/blobs/). Recently I created an [Azure Blob storage demo project in Unity](https://github.com/Unity3dAzure/StorageServicesDemo) to show how to save and load these various asset types in Unity. One of the exciting new applications for Unity is developing <acronym title="Virtual Reality">VR</acronym>, <acronym title="Augmented Reality">AR</acronym> or <acronym title="Mixed Reality">MR</acronym> experiences for HoloLens where a backend could serve media content dynamically whether it's images, audio, or prefabs with models, materials and referenced scripts. When thinking of cloud gaming the tendency is to consider it in terms of end user scenarios like massive multiplayer online games. While Azure is designed to scale, it is also helpful to use during early stage development and testing. There is an opportunity to create productive cloud tools for artists, designers and developers especially when extensive hardware testing is required in Virtual Reality, Augmented Reality or Mixed Reality development. For example, imagine being able to see and test updates on the hardware without having to rebuild the binaries in Unity or Visual Studio each time. There are many more use cases than IΓÇÖve mentioned here like offering user generated downloadable content for extending your game or app.

I'll be covering the load and save code snippets from the [Unity and Azure Blob storage demo commentary](https://youtu.be/0gpg2xwusjM) which you can watch to see how you can save and load image textures, audio clips as _.wav_ files, and Asset Bundles. The Unity Asset Bundle demo will also include loading Prefabs and dynamically adding them into a Unity Scene using XML or JSON data which should give you some ideas of how you might like to use Blob storage in your Unity development or end user scenario.

<div class="video"><iframe src="https://www.youtube.com/embed/0gpg2xwusjM?ecver=2" frameborder="0" allowfullscreen></iframe></div>

## Setup Azure Blob Storage

Setting up Blob Storage for the Unity demo can be done quickly in just a couple of steps:

1. Sign in to your [Azure portal](https://portal.azure.com) and create a new Storage Account.
   ![01-StorageAccount]({{ site.baseurl }}/assets/images/01-StorageAccount.png)
2. Once the Storage account is provisioned then select the add new container button which will be used for storing the blobs.

![02-CreateContainer]({{ site.baseurl }}/assets/images/02-CreateContainer.png)

3. Create the '<string>Blob' type container which permits public read access for the purposes of this demo.</string>

![03-NewContainer-BlobAccess]({{ site.baseurl }}/assets/images/03-NewContainer-BlobAccess.png)

## Audio files

### Saving Unity Audio Clips into Blob Storage

For the [Unity audio blob demo](https://github.com/Unity3dAzure/StorageServicesDemo/tree/master/Assets/Demos/Audio) I created a [helper script to convert Unity Audio Clip recording to .wav files](https://github.com/deadlyfingers/UnityWav) for the purpose of saving to Azure Blob Storage.  
Once the audio has been recorded in Unity I can upload the file using the `PutAudioAudio` method which takes a callback function, the wav bytes, the container resource path, the filename and the file's mime type. By the way this method must be wrapped using [StartCoroutine](https://docs.unity3d.com/ScriptReference/MonoBehaviour.StartCoroutine.html) which is the way Unity 5 handles asynchronous requests. Once the request is completed it will trigger the `PutAudioCompleted` callback function I have provided my script with a response object. If the response is successful you will see the wav file blob added in your Blob Container.

☞ Tip: Grab the [Storage Explorer app](http://storageexplorer.com/) for viewing all the blobs!

```csharp
private void PutAudio ()
{
	byte[] wavBytes = File.ReadAllBytes (localPath);
	string filename = Path.GetFileName (localPath);
	Debug.Log ("Put audio file: " + filename);
	StartCoroutine (blobService.PutAudioBlob (PutAudioCompleted, wavBytes, container, filename, "audio/wav"));
}

public void PutAudioCompleted (RestResponse response)
{
	if (response.IsError) {
		Debug.LogError( "Put audio file error: " + response.ErrorMessage );
		return;
	}
	Debug.Log ("Put audio blob success: " + response.Url);
}
```

### Loading .wav files from Blob Storage

As we used the Blob type container with public read access you can use the [`UnityWebRequest.GetAudioClip`](https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest.GetAudioClip.html) method to directly load the .wav file from Azure Blob Storage and handle it as a native Unity AudioClip type for playback.

```csharp
public void TappedLoad ()
{
	string filename = Path.GetFileName (localPath);
	string url = Path.Combine (client.PrimaryEndpoint () + container, filename);
	Debug.Log ("Load audio blob: " + url);
	StartCoroutine (LoadAudioURL (url));
}

private IEnumerator LoadAudioURL (string url)
{
	UnityWebRequest www = UnityWebRequest.GetAudioClip (url, AudioType.WAV);
	yield return www.Send ();
	if (www.isError) {
		Debug.LogError( "Load audio url error: " + www.error );
	} else {
		AudioClip audioClip = ((DownloadHandlerAudioClip)www.downloadHandler).audioClip;
		audioSource.clip = audioClip;
		audioSource.Play ();
	}
}
```

## Image files

For the [Unity image blob demo](https://github.com/Unity3dAzure/StorageServicesDemo/tree/master/Assets/Demos/Image) I used Unity's [`Application.CaptureScreenshot`](https://docs.unity3d.com/ScriptReference/Application.CaptureScreenshot.html) method to generate a png image representation of the current state of the game screen.

### Saving Images into Blob Storage

The image is saved using the `PutImageBlob` method which is similar to the audio blob except we pass the image bytes and mime type.

```csharp
private void PutImage (byte[] imageBytes)
{
	string filename = Path.GetFileName (localPath);
	StartCoroutine (blobService.PutImageBlob (PutImageCompleted, imageBytes, container, filename, "image/png"));
}

private void PutImageCompleted (RestResponse response)
{
	if (response.IsError) {
		Debug.LogError( "Put image file error: " + response.ErrorMessage );
		return;
	}
	Debug.Log ("Put image blob:" + response.Url);
}
```

### Loading Image Textures from Blob Storage

As we used the Blob type container with public read access you can use the [`UnityWebRequest.GetTexture`](https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest.GetTexture.html) method to directly load the .png file from Azure Blob Storage and handle it as a native Unity Texture type for use. As I want to use the Texture in Unity UI to display as an [Image](https://docs.unity3d.com/ScriptReference/UI.Image.html) I need to convert it to a sprite using my `ChangeImage` function.

```csharp
public void TappedLoad ()
{
	ChangeImage (new Texture2D (1, 1));
	string filename = Path.GetFileName (localPath);
	string url = Path.Combine (client.PrimaryEndpoint () + container, filename);
	Debug.Log ("Load image: " + url);
	StartCoroutine (LoadImageURL (url));
}

public IEnumerator LoadImageURL (string url)
{
	UnityWebRequest www = UnityWebRequest.GetTexture (url);
	yield return www.Send ();
	if (www.isError) {
		Debug.LogError( "Load image url error: " + www.error );
	} else {
		Texture texture = ((DownloadHandlerTexture)www.downloadHandler).texture;
		ChangeImage (texture);
	}
}

private void ChangeImage (Texture2D texture)
{
	Sprite sprite = Sprite.Create (texture, new Rect (0, 0, texture.width, texture.height), Vector2.zero);
	image.GetComponent<Image> ().sprite = sprite;
}

private void ChangeImage (Texture texture)
{
	ChangeImage (texture as Texture2D);
}
```

## Unity Asset Bundles

[Unity Asset Bundles](https://docs.unity3d.com/ScriptReference/AssetBundle.html) provide a way to dynamically load in assets in your project. This [Asset Bundle demo for Blob Storage](https://github.com/Unity3dAzure/StorageServicesDemo/tree/master/Assets/Demos/AssetBundle) is a little more complicated than the other examples. An important note to remember is that Asset Bundle binaries need to be build for each target platform. Refer to Unity documentation on [building Asset Bundles](https://docs.unity3d.com/Manual/BuildingAssetBundles.html) for more info on building Asset Bundles. Also make sure to review the code stripping section if you want to be able to use referenced scripts in your Prefabs when you do a build.

### Building and uploading the Asset Bundles for each platform to Blob Storage

I have included the Editor scripts with the demo to build the Asset Bundle for each platform. NB: Windows 10 Store App (or HoloLens) bundles can only be built on the Windows Unity Editor at time of writing this. Building the Asset Bundles and uploading them is performed inside Unity Editor:

1. Select Assets \> Build Asset Bundles
2. Select Window \> Upload Asset Bundles...

### Loading Asset Bundles from Blob Storage

```csharp
public void TappedLoadAssetBundle ()
{
	string filename = assetBundleName + "-" + GetAssetBundlePlatformName () + ".unity3d";
	string url = Path.Combine (client.SecondaryEndpoint () + container, filename);
	Debug.Log ("Load asset bundle: " + url);
	StartCoroutine (LoadAssetBundleURL (url));
}

public IEnumerator LoadAssetBundleURL (string url)
{
	UnityWebRequest www = UnityWebRequest.GetAssetBundle (url);
	yield return www.Send ();
	if (www.isError) {
		Debug.LogError( "Load Asset Bundle url error: " + www.error );
		yield break;
	} else {
		assetBundle = ((DownloadHandlerAssetBundle)www.downloadHandler).assetBundle;
		Debug.Log("Load url: " + url);
		StartCoroutine (LoadAssets (assetBundle, "CloudCube"));
	}
}

private string GetAssetBundlePlatformName ()
{
	switch (Application.platform) {
	case RuntimePlatform.WindowsEditor:
	case RuntimePlatform.WindowsPlayer:
		return SystemInfo.operatingSystem.Contains ("64 bit") ? "x64" : "x86";
	case RuntimePlatform.WSAPlayerX86:
	case RuntimePlatform.WSAPlayerX64:
	case RuntimePlatform.WSAPlayerARM:
		return "WSA";
	case RuntimePlatform.Android:
		return "Android";
	case RuntimePlatform.IPhonePlayer:
		return "iOS";
	case RuntimePlatform.OSXEditor:
	case RuntimePlatform.OSXPlayer:
		return "OSX";
	default:
		throw new Exception ("Platform not listed");
	}
}
```

If you like the [Azure Storage Services library for Unity](https://github.com/Unity3dAzure/StorageServices) let me know about it on [Twitter](https://twitter.com/deadlyfingers). Any issues, features or blob storage demo requests please create it as an issue on github for others to learn from and collaborate.
