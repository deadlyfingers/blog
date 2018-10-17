---
layout: post
title: Swift JSON parsing for iOS development
date: 2016-08-23 09:37:01.000000000 +01:00
published: true
categories: code
tags:
- Alamofire
- Argo
- JSON
- Swift
meta:
  dsq_thread_id: '5663941220'
comments: true
author: David Douglas
---
Recently I started a new iOS Swift project and spent way more time than I would like trying to find a JSON parser that could handle the various JSON data models I was working with. In this post I will document some real code samples that should prove useful for other iOS developers looking to get off to head start with data modelling in Swift.

## The search for a Swift JSON parser…

Handling JSON is a very common task with modern app development whether its consuming some REST Service API, loading a JSON file or document objects from database. With regards to Windows C# apps [Newtonsoft JSON](http://www.newtonsoft.com/json) is the popular choice and similarly with Java for Android there is [GSON](https://github.com/google/gson). But what library to use for iOS apps? Previously I had used libraries like [JSONModel](https://github.com/jsonmodel/jsonmodel) to parse JSON data into native objects and it worked pretty well. But the iOS developer landscape has changed with the shift from Objective C to Swift so I wanted to find a Swift based framework. There are a number of open source Swift JSON parsers, but the ones I tried resulted in code mountains just to parse some format of JSON. This felt like a fail compared to the elegant manner of Newtonsoft or GSON object models. I was surprised how hard it was to pinpoint the one Swift library that could satisfy all my parsing needs. But with [Argo](https://github.com/thoughtbot/Argo) I feel I've discovered the golden JSON parsing library for iOS Swift development.

## Getting on board with Argo

I'm a long time user of [CocoaPods](https://cocoapods.org/) for Xcode source control projects as it makes it easier to avoid jamming up a repro with binaries. However the precompiled versions on CocoaPods don't always provide the latest version available on GitHub. This is where [Carthage](https://github.com/Carthage/Carthage) comes in as you specifically request a tag version or branch on GitHub. Carthage can be quickly installed using [Homebrew](http://brew.sh/) as mentioned in the [installing Carthage docs].(https://github.com/Carthage/Carthage#installing-carthage)  

`brew install carthage`

To setup create a new text file and save it as '**Cartfile**' inside your Xcode project folder. (In this case I'm requesting a specific version of Argo and Curry for use with Swift 2)

```conf
github "thoughtbot/Argo" == 3.0.2
github "thoughtbot/Curry" == 2.2
```

Once you have installed Carthage and saved a 'Cartfile' then you need to build the frameworks.

1. In Terminal navigate to the project folder and run `carthage update` to build frameworks for all platforms. NB: For packages that can only be built for a single platform use `carthage build --platform iOS`
2. Drop built '\*.framework' folder into Xcode project
3. Add Build Phases \> Run Script `carthage copy-frameworks` and add Input Files path to '\*.framework'

## JSON data modelling with Argo

Argo decodes standard property types (`String, Int, UInt, Int64, UInt64, Double, Float, Bool`) as well as arrays and optional properties. You can decode a nested object or an array of nested objects that conform to the 'Decodable' protocol. In fact you can even do inception - using the same struct within itself as shown below. One thing that might require explanation is [Argo's sugar syntax](https://github.com/thoughtbot/Argo/blob/master/Documentation/Basic-Usage.md#safely-pulling-values-from-json). The summary of the sugar syntax is this:

- **`<^>`** syntax pulls the first property, and `<*>` pulls subsequent properties.
- **`<|`** syntax relates to a property.
- **`<|?`** syntax relates to an optional property.
- **`<||`** syntax relates to an array of 'decodable' objects.
- **`<||?`** syntax relates to an array of optional 'decodable' objects

```swift
import Foundation
import Argo
import Curry

struct SomeModel {
    let id : String
    let name : String
    let total : Int
    let isHighlighted : Bool
    let optional : String?
    let children : [SomeModel]?
}

extension SomeModel: Decodable {
    static func decode(j: JSON) -> Decoded<SomeModel> {
        return curry(SomeModel.init)
            <^> j <| "_id"
            <*> j <| "name"
            <*> j <| "total"
            <*> j <| "highlighted"
            <*> j <|? "optional"
            <*> j <||? "children"
    }
}
```

## What about decoding JSON values into native types like NSURL and NSDate?

It can be advantageous to parse URL and date values as native types instead of String types. To get this to work with Argo you need to make a parser which wraps NSURL and NSDate in the 'Decoded' type. But first I made a Uri helper to encode url strings as NSURL and a Date helper to convert a date string (of a known format) to NSDate.

```swift
import Foundation
class Uri {
    static func encodeURLString(urlString: String) -> String {
        let characterSet = NSMutableCharacterSet()
        characterSet.formUnionWithCharacterSet(NSCharacterSet.URLPathAllowedCharacterSet())
        characterSet.formUnionWithCharacterSet(NSCharacterSet.URLQueryAllowedCharacterSet())
        return urlString.stringByAddingPercentEncodingWithAllowedCharacters( characterSet ) ?? urlString
    }
}
```

```swift
import Foundation

enum DateFormats : String {
    case Milliseconds = "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'SSS'Z'"
    case Seconds = "yyyy'-'MM'-'dd'T'HH':'mm':'ss'Z'"
}

class Date {
    static private let dateFormatter = NSDateFormatter()
    
    // converts String (using array of potential date formats) to Date
    static func StringToDate(dateString : String) -> NSDate? {
        var date : NSDate? = nil
        let dateFormats : [String] = [DateFormats.Milliseconds.rawValue, DateFormats.Seconds.rawValue]
        for dateFormat in dateFormats {
            dateFormatter.dateFormat = dateFormat
            if let formatedDate = dateFormatter.dateFromString(dateString) {
                date = formatedDate
                break
            }
        }
        return date
    }
}
```

The Parser helper returns objects wrapped in Decoded type:

```swift
import Foundation
import Argo

class Parser {
    
    static func toNSURL(urlString : String) -> Decoded<NSURL> {
        let urlEncodedString = Uri.encodeURLString(urlString)
        guard let url = NSURL(string: urlEncodedString) else {
            return Decoded.Failure(DecodeError.Custom("Failed to parse String to NSURL"))
        }
        // Return NSURL wrapped in .Success
        return pure(url)
    }
    
    static func toNSDate(dateString : String) -> Decoded<NSDate> {
        guard let date = Date.StringToDate(dateString) else {
            return Decoded.Failure(DecodeError.Custom("Failed to parse String to NSDate"))
        }
        // Return NSDate wrapped in .Success
        return pure(date)
    }
    
    // optional (nil values are allowed)
    
    static func toOptionalNSDate(dateString : String?) -> Decoded<NSDate?> {
        guard let str = dateString else {
            return pure(nil) // No date string
        }
        guard let date = Date.StringToDate(str) else {
            return Decoded.Failure(DecodeError.Custom("Failed to parse String to NSDate"))
        }
        // Return NSDate wrapped in .Success
        return pure(date)
    }
}
```

Example model with NSURL and NSDate using the Parser helper (note the extra brackets):

```swift
import Foundation
import Argo
import Curry

struct SomeModel {
    let id : String
    let url : NSURL
    let dateCreated : NSDate?
}

extension SomeModel: Decodable {
    static func decode(j: JSON) -> Decoded<SomeModel> {
        return curry(SomeModel.init)
            <^> j <| "_id"
            <*> (j <| "url" >>- Parser.toNSURL)
            <*> (j <|? "date_created" >>- Parser.toOptionalNSDate)
    }
}
```

## Three things to avoid in your JSON models for smoother sailing with Argo

1. Two dimensional arrays (arrays within an array) aren't handled out of the box. There are [multi-dimensional array workarounds](https://github.com/thoughtbot/Argo/issues/166) but it can cause compiler melt down if your model is particularly complex. Better to avoid this complexity by flattening arrays to a single array or use nested property arrays.
2. Best to limit object model to no more than 10 properties. This is because there are limits of how many things can be curried with Argo before the complier gives up. Try to use nested objects to group things together, but if that is not possible then there are techniques to deal with [complex expressions](https://github.com/thoughtbot/Argo/blob/master/Documentation/Compilation-Errors.md#complex-expressions).
3. Array of mixed objects (dynamic types). Argo can be made to [decode an array of different types](https://github.com/thoughtbot/Argo/issues/325) but it will increase complexity as you will have to use subclasses instead of structs.

## How to load JSON file within iOS app bundle in Swift

Often the first thing I like to do is to load a JSON file to configure my app. For example you might have various JSON config files for localhost, staging and production settings.

```json
{
    "app_url": "https://someapp.azurewebsites.net",
}
```

The data model using [Argo](https://github.com/thoughtbot/Argo) & [Curry](https://github.com/thoughtbot/Curry) would look like this in Swift:

```swift
import Foundation
import Argo
import Curry

struct ConfigModel {
    let appUrl: String
}

extension ConfigModel: Decodable {
    static func decode(j: JSON) -> Decoded<ConfigModel> {
        return curry(ConfigModel.init)
            <^> j <| "app_url"
    }
}
```

To load the JSON file within the app bundle I use a file helper:

```swift
// returns json from file
static func loadJSON(file: String) -> AnyObject? {
    let path : String? = NSBundle.mainBundle().pathForResource(file, ofType: "json")
    guard let unwrappedPath = path else {
        return nil
    }
    let fileContents : NSData? = NSData(contentsOfFile: unwrappedPath)
    guard let data = fileContents else {
        return nil
    }
    do {
        return try NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.AllowFragments)
    } catch let error as NSError {
        print(error.localizedDescription)
    }
    return nil
}
```

The loaded JSON can be parsed into the 'ConfigModel' using Argo's decode method.

```swift
func loadConfig(file:String) -> ConfigModel? {
    let json : AnyObject? = loadJSON(file)
    if let j = json {
        return decode(j)
    }
    debugPrint("Error with \(file).json file")
    return nil
}
```

While this is fine for converting one type of object, what if you have multiple data models? You could quickly end up with a lot of repetitive code. One of the powerful things with Swift 2 is that it supports Abstract Types. Argo needs a little help to ensure the abstract type conforms to the Decodable type so there is slightly more boilerplate in this case, but it should help keep things DRY.

```swift
func loadJSONFile<T: Decodable where T == T.DecodedType>(file : String) -> T? {
    let json : AnyObject? = loadJSON(file)
    if let j: AnyObject = json {
        return decode(j)
    }
    debugPrint("Error with \(file).json file")
    return nil
}
```

The JSON config file can be loaded in AppDelegate in the 'didFinishLaunchingWithOptions' method:

```swift
var config: ConfigModel? 
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    config = loadJSONFile("config")
    return true
}
```

## Parsing JSON response from REST service

I also needed to parse various JSON results provided by via REST service API. To handle the REST request here I'll be using the [Alamofire](https://github.com/Alamofire/Alamofire) library for Swift. Alamofire can also be added to the Cartfile:

```conf
github "Alamofire/Alamofire" ~\> 3.4
```

Below is an example snippet taken from a login POST request. When using Alamofire the JSON data is available as `response.result.value` which can be parsed with the Argo decode method.

```swift
func login(username: String, password: String) {
    let authURL : NSURL = NSURL(string: "https://some_auth_endpoint")
    
    // Request body params
    let parameters : [String: AnyObject] = [
        "username": username,
        "password": password
    ]
    
    // Initiate async request using Alamofire 
    Alamofire.request(.POST, authURL, parameters: parameters, encoding: .JSON).responseJSON {
        response in
        
        // Return early on failure
        guard response.response?.statusCode == 200 else {
            let alert = UIAlertController.init(title: "Error", message: "Failed to login, please check username and password.", preferredStyle: .Alert)
            alert.addAction(UIAlertAction(title: "Ok", style: .Cancel, handler: {(alertAction: UIAlertAction) in
                alert.dismissViewControllerAnimated(true, completion: nil)
            }))
            self.presentViewController(alert, animated: true, completion: nil)
            return
        }
        
        // Parse JSON result value using Argo
        guard let result = response.result.value,
              let authToken: AuthTokenModel = decode(result) else {
            debugPrint("Auth token model parse error")
            return
        }
        
        // Login was successful, do stuff here and then navigate to home screen...
    }
}
```

One thing to point out: I have used very simple parse error detection here - it either decodes or it doesn't and there is no indication of what went wrong during the decode process. With smaller data models this form of indication is perfectly adequate. But when you are working with complex data models then this type of error reporting is not granular enough to pinpoint the exact the problem if you get a parse error. Fortunately Argo provides a way to parse with failure reporting by using a Decoded type.

```swift
// Get JSON data from Alamofire response
guard let result = response.result.value else {
    print("No request result")
    return
}

// Try decoding model with failure reporting by using Argo's Decoded type
let decodeResult: Decoded<SomeModel> = decode(result)
switch(decodeResult) {
case .Failure:
    print("Failed to decode model: \(decodeResult.error?.description)")
    return
case .Success:
    print("Decode success")
}

// Assign decoded value to data model
guard let report : SomeModel = decodeResult.value else {
    print("Error unwrapping Report result")
    return
}
```

I found this an absolutely invaluable technique to be able to debug issues with my complex models, especially as models are pretty verbose and its always hard to spot that one string mistake.

## What's next…

What about storing loaded data for offline use? JSON documents can be stored with revisions using a [Couchbase Lite](http://developer.couchbase.com/documentation/mobile/1.3/develop/references/couchbase-lite/couchbase-lite/index.html) database. The problem here is Argo only accommodates decode, but the native objects will need encoded back into JSON for use with Couchbase. This is where [Ogra](https://github.com/edwardaux/Ogra) (Argo in reverse) comes in. The only thing is you will need to extend the data object with an encode method. If you found this post useful or if you would be interested to see some Ogra to Couch examples just fire me a tweet [@deadlyfingers](https://twitter.com/deadlyfingers).

