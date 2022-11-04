import React, {useEffect, useState} from 'react'
import {fetchYoutubeVideoDetails} from "../api/youtubeApi";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {getFirstNWords} from "../utils/StringUtils";
import {Accordion, AccordionDetails, AccordionSummary, Button, Skeleton, Slider, TextField} from "@mui/material";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Content.css';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';

type ContentType = {
    videoId: string | null;
}

const Content = ({videoId}: ContentType) => {
    const [videoDetails, setVideoDetails] = useState<any>(null)

    useEffect(() => {
        videoId && fetchYoutubeVideoDetails(videoId)
            .then(res => {
                console.log('video res: ', res)
                setVideoDetails(res)
                return res;
            })
            .catch(err => console.log("err fetching video details"))
    }, [videoId])


    const renderSkelton = () => {
        return (
            <>
                <Skeleton variant="text" sx={{fontSize: '1rem', marginTop: 5}}/>
                <Skeleton variant="circular" width={50} height={50} sx={{marginTop: 2}}/>
                <Skeleton variant="rectangular" height={200} sx={{marginTop: 2}}/>
            </>
        )
    }


    // Focus on loop button
    // make accorion controllable

    const renderCard = () => {
        return (
            <Card className="card-container">
                <CardMedia
                    className="thumbnail"
                    component="img"
                    image={videoDetails?.thumbnail_url}
                    alt="video thumbnail"
                    sx={{aspectRatio: "2"}}
                />
                <CardContent sx={{paddingBottom: 0}}>
                    <Typography gutterBottom component="div" variant="h5">
                        {videoDetails && getFirstNWords(videoDetails.title, 4)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {videoDetails?.author_name}
                    </Typography>
                </CardContent>
                <Box className="input-time-container">
                    <Box className="input-time">
                        <TextField className="input-time-field" label="Minutes" variant="standard" size="small"/>
                        <TextField className="input-time-field" label="Seconds" variant="standard" size="small"/>
                    </Box>
                    <Box className="loop-icon-container">
                        <CachedTwoToneIcon className="input-time" fontSize="small"/>
                    </Box>
                    <Box className="input-time">
                        <TextField className="input-time-field" label="Minutes" variant="standard" size="small"/>
                        <TextField className="input-time-field" label="Seconds" variant="standard" size="small"/>
                    </Box>
                </Box>
                <Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Advanced Settings</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{display: 'flex'}}>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="fade start"/>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="fade end"/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                Bitrate:
                                <Slider
                                    aria-label="Bitrate"
                                    defaultValue={1}
                                    getAriaValueText={(val) => `${val}`}
                                    valueLabelDisplay="auto"
                                    step={0.1}
                                    marks
                                    min={1}
                                    max={2}
                                    sx={{marginLeft: 2}}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box className="button-container">
                    <Button size="small" variant="contained">Put on Loop!</Button>
                </Box>
            </Card>
        );
    }

    return (
        <div className="content">
            {
                !videoDetails ? renderSkelton() : renderCard()
            }
        </div>
    )
}

export default Content;