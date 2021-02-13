const initialState = {
    inLoop: false,
    intervalID: null,
    onplaying: {
        url:"",
        startTime: 0,
        finishTime: 0
    },
    playable:{
        title:"",
        duration:0
    }
}

let currentState = {...initialState};

// handles the requests coming from popup
const handleRequest = (action , data, sendResponse) => {

    if(action === 'requestOrStop'){
        if(currentState.inLoop === true){
            cancelLoop(currentState);
            currentState = {...initialState};
        }else {
            currentState.inLoop = true;
            currentState.playing = {
                url: fetchCurrentURL(),
                startTime: data.startTime,
                finishTime: data.finishTime
            }
            setUpLoop(currentState)
        }
    }

    updateCurrentPlayableState(currentState)
    sendResponse({...currentState})
}

// gets current page URL
const fetchCurrentURL = () => window.location.href;

// gets 1st HTML Video element
const fetchPlayingVideo = () => {
    const allVideos = document.getElementsByTagName('video');

    if(!allVideos){
        return null;
    }
    return allVideos[0];
}

// sets up the actual loop
const setUpLoop = (currentState) => {
    const {startTime, finishTime} = currentState.playing;
    const player = fetchPlayingVideo();

    if(!player){
        alert("no playing video found");
        return;
    }
    player.currentTime = startTime;
    currentState.intervalID = setInterval(() => player.currentTime = startTime, (finishTime - startTime) * 1000);
}

// cancels the loop
const cancelLoop = (currentState) => {
    if(!currentState.intervalID){
        alert("Something went wrong");
    }
    clearInterval(currentState.intervalID);
}

const updateCurrentPlayableState = (currentState) => {
    const video = fetchPlayingVideo()
    currentState.playable.title = document.title;
    currentState.playable.duration = video.duration;
}