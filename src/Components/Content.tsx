import React, {useEffect, useState} from 'react'
import {fetchYoutubeVideoDetails} from "../api/youtubeApi";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {getFirstNWords} from "../utils/StringUtils";
import {Button, TextField} from "@mui/material";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import './Content.css';

type ContentType = {
    videoId: string
}

const Content = ({videoId}: ContentType) => {
    const [videoDetails, setVideoDetails] = useState<any>(null)

    useEffect(() => {
        fetchYoutubeVideoDetails(videoId)
            .then(response => {
                console.log(response);
                setVideoDetails(response);
                return response;
            })
            .catch(err => console.log('error fetching video details: ', err))
    }, [videoId])

    return (
        <Card className="content">
            <CardMedia
                className="thumbnail"
                component="img"
                image={videoDetails?.thumbnail_url}
                alt="video thumbnail"
            />
            <CardContent>
                <Typography gutterBottom component="div" variant="h5">
                    {videoDetails && getFirstNWords(videoDetails.title, 4)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {videoDetails?.author_name}
                </Typography>
            </CardContent>
            <Box className="input-time-container">
                <Box className="input-time">
                    {/*<TextField className="input-time" label="Hour" variant="standard" size="small"/>*/}
                    <TextField className="input-time-field" label="Minutes" variant="standard" size="small"/>
                    <TextField className="input-time-field" label="Seconds" variant="standard" size="small"/>
                </Box>
                <Box className="loop-icon-container">
                    <AllInclusiveIcon className="input-time" fontSize="small"/>
                </Box>
                <Box className="input-time">
                    {/*<TextField className="input-time" label="Hour" variant="standard" size="small"/>*/}
                    <TextField className="input-time-field" label="Minutes" variant="standard" size="small"/>
                    <TextField className="input-time-field" label="Seconds" variant="standard" size="small"/>
                </Box>
            </Box>
            <Box className="button-container">
                <Button size="small" variant="contained">Loop it!</Button>
            </Box>
        </Card>
    )
}

export default Content;