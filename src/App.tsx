import React, {useEffect, useState} from 'react';
import './App.css';
import Content from "./Components/Content";
import {sendMessage} from "./utils/ChromeUtils";
import {FETCH_VIDEO_ID} from "./common/Constants";

const App = () => {
    const [videoId, setVideoId] = useState<string | null>(null);

    useEffect(() => {
        sendMessage({type: FETCH_VIDEO_ID}, (videoId: string) => setVideoId(videoId));
    }, [])


    console.log("videoId: ", videoId);
    return (
        <div className="App">
            <Content videoId={videoId}/>
        </div>
    );
}

export default App;
