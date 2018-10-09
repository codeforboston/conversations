import { createStackNavigator } from 'react-navigation';

import ShareStoryScreen from "../upload/ShareStoryScreen.js";
import UploadVideoScreen from "../upload/UploadVideoScreen.js";
import UploadProgress from "../upload/UploadProgress.js";
import UploadedFilesList from "../upload/UploadedFilesList.js";


const UploadStack = createStackNavigator({
    ShareStory: {
        screen: ShareStoryScreen
    },
    UploadVideo: {
        screen: UploadVideoScreen
    },
    UploadProgress: {
        screen: UploadProgress
    },
    UploadedFiles: {
        screen: UploadedFilesList
    }
}, {
    initialRouteName: 'ShareStory',
    headerMode: 'none',
    headerBackTitleVisible: false,
});

export default UploadStack;


UploadStack.navConfig = {
    screen: UploadStack
};
