
# react-native-wogaa-analytics

## Getting started

`$ npm install react-native-wogaa-analytics --save`

### Mostly automatic installation

`$ react-native link react-native-wogaa-analytics`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-wogaa-analytics` and add `RNWogaaAnalytics.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNWogaaAnalytics.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNWogaaAnalyticsPackage;` to the imports at the top of the file
  - Add `new RNWogaaAnalyticsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-wogaa-analytics'
  	project(':react-native-wogaa-analytics').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-wogaa-analytics/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-wogaa-analytics')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNWogaaAnalytics.sln` in `node_modules/react-native-wogaa-analytics/windows/RNWogaaAnalytics.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Wogaa.Analytics.RNWogaaAnalytics;` to the usings at the top of the file
  - Add `new RNWogaaAnalyticsPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNWogaaAnalytics from 'react-native-wogaa-analytics';

// TODO: What to do with the module?
RNWogaaAnalytics;
```
  