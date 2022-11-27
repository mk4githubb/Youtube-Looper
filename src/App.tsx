import React, {useEffect, useState} from 'react';
import './App.css';
import Content from "./components/Content";
import {sendMessage} from "./utils/ChromeUtils";
import {FETCH_VIDEO_ID} from "./common/Constants";
import Typography from "@mui/material/Typography";

const App = () => {
    const [videoId, setVideoId] = useState<string | null>(null);

    useEffect(() => {
        // sendMessage({type: FETCH_VIDEO_ID}, (videoId: string) => setVideoId(videoId));
    }, [])


    console.log("videoId: ", videoId);
    return (
        <div className="App">
            <header className="flex-container brand-name-container">
                <div className="icon-container">
                    <img src={require("./assets/icons/youtube-icon.png")} alt="youtube icon"/>
                </div>
                <Typography variant="h4">YouTube Looper</Typography>
            </header>
            <Content videoId="S5FyS7tQuUw"/>
        </div>
    );
}

export default App;
