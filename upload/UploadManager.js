import {
    AsyncStorage,
} from "react-native";
import EventEmitter from "events";
import firebase from "react-native-firebase";


export function getVideoFileName(path) {
    return path.split("/").slice(-1)[0];
}

class Upload extends EventEmitter {
    constructor(id, video) {
        super();
        this.id = id;
        this.video = video;
        this.path = video.video.path;
        this.transferred = 0;
        this.total= 1000;
        this.complete = false;
    }

    async authorize() {
        if (!this.creds)
            this.creds = await firebase.auth().signInAnonymouslyAndRetrieveData();

        return this.creds;
    }

    async start() {
        const {desc, email, name, notify} = this.video,
              {user} = await this.authorize(),
              path = this.path,
              refpath = `${user.uid}/${this.id}`,
              ref = firebase.storage().ref(refpath);

        var metadata = {
            contentType: "video/mp4",
            customMetadata: {
                name: name,
                description: desc,
                email: email,
                userAuthId: user.uid,
                notifyIfPublished: notify
            }
        };

        let unsubscribe = ref.putFile(path, metadata).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (event) => {
                let {state, bytesTransferred, totalBytes} = event;

                this.transferred = bytesTransferred;
                this.total = totalBytes;

                if (state === firebase.storage.TaskState.SUCCESS) {
                    this.complete = true;
                    this.emit("complete", {
                        name: name,
                        size: totalBytes,
                        date: new Date(),
                        description: desc,
                        email: email || "",
                        notify: notify
                    });

                    unsubscribe();
                }

                this.emit("update");
            },
            (error) => {
                unsubscribe();
                this.emit("error", error);
                this.emit("update");
                this.error = error;
                console.error(error);
            }
        );
    }
}

class UploadManager {
    _uploads = {}

    create(videoInfo) {
        const name = getVideoFileName(videoInfo.video.path),
              upload = new Upload(name, videoInfo);

        this._uploads[name] = upload;
        upload.start();
        return upload;
    }

    getUpload(uploadId) {
        return this._uploads[uploadId];
    }

    async getUploadedVideos() {
        var videos = await AsyncStorage.getItem("@Aashiyaan:uploaded");
        if (videos) {
            videos = JSON.parse(videos);
            return Object.keys(videos).map(k => videos[k]);
        } else {
            return [];
        }
    }

    async saveVideoInfo(video) {
        var date = video.date || new Date().toISOString();
        if (typeof date !== "string")
            date = date.toISOString();

        return AsyncStorage.mergeItem("@Aashiyaan:uploaded",
                                      JSON.stringify({
                                          [date]: video
                                      }))
            .then(() => this.getUploadedVideos())
            .catch(error => {
                console.log(error);
            });
    }

}

export default new UploadManager();
