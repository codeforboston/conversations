# Conversations

## Getting Up and Running

TODO does https://medium.com/surabayadev/setting-up-react-native-android-without-android-studio-35a496e1dfa3 make things simpler?

1. Install [node.js](https://nodejs.org/en/download/)
1. Install the [Yarn Package Manager](https://yarnpkg.com/lang/en/docs/install/)
1. Configure Android
   1. Install [Android Studio](https://developer.android.com/studio/install.html)
   1. create an `ANDROID_HOME` environment variable, pointing at your Android SDK directory (`~/Library/Android/sdk` on a Mac, most likely)
   1. Within Android Studio, `Open an existing Android Studio project` and select the `android` directory within this repository
   1. Create a [virtual device] using the Nexus 5X device template and Android 7.0 (Google APIs) (https://developer.android.com/studio/run/managing-avds.html)
   1. You must launch the device in the Android emulator in order to run the application. (In Android Studio, go to AVD Manager and click the green 'Play' triangle to the right of the virtual device you created, before running `yarn android` or `react-native run-android`).
1. Create a [YouTube API key](https://console.developers.google.com/apis/credentials) for local development (see the [Getting Started](https://developers.google.com/youtube/v3/getting-started) guide for more information)
1. create a `YOUTUBE_API_KEY` environment variable equal to your API key
1. Run `yarn start` from within a terminal in the project directory to start the development server
1. View the application from within your Android virtual device by running `yarn android` in a separate terminal session
