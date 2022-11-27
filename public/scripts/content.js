const YOUTUBE_VIDEO_ID_REGEX = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/

const getVideoIdByUrl = (url) => {
    const matches = YOUTUBE_VIDEO_ID_REGEX.exec(url);
    console.log('matches :', matches)
    return matches ? matches[2] : null
}

console.log("********** Exceucting Code **********");

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log("##############################")
        console.log("######### MESSAGE ############")
        console.log("##############################")

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        console.log('Message received on Content: ', request)
        const {type} = request;
        if (type === "FETCH_VIDEO_ID") {
            const videoNode = fetchVideoNode();
            console.log("Responding with: ", {
                type: request.type,
                data: {
                    videoId: getVideoIdByUrl(window.location.href),
                    duration: videoNode && videoNode.duration;
                }
            })

            return sendResponse({
                type: request.type,
                data: getVideoIdByUrl(window.location.href)
            });
        }
    }
);


const fetchVideoNode = () => {
    return document.querySelector('video');
}


const start = () => {
    const videoId = getVideoIdByUrl(window.location.href)
    const playingVideo = document.querySelector('video');

    if (!videoId) {
        console.error("Unable to parse video id");
        return
    } else if (!playingVideo) {
        console.error("Unable to find playing video");
        return
    }


    console.group("**************");
    console.log(playingVideo);
    console.groupEnd();

};

start();