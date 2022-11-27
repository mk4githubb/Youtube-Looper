import React, {useEffect, useState} from 'react'
import {fetchYoutubeVideoDetails} from "../api/youtubeApi";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {getFirstNWords} from "../utils/StringUtils";
import {Accordion, AccordionDetails, AccordionSummary, Button, Skeleton, Slider, TextField} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Content.css';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import {sendMessage} from "../utils/ChromeUtils";
import {ContentType, MinuteSecondsEnum, StartEndEnum, YlRequest, YlState} from "../common/Types";

const defaultYlState: YlState = {
    isLooping: false,
    loopTime: {
        start: {
            minutes: 0,
            seconds: 0
        },
        end: {
            minutes: 0,
            seconds: 0
        }
    },
};

const Content = ({videoId}: ContentType) => {
    const [videoDetails, setVideoDetails] = useState<any>(null);
    const [ylState, setYlState] = useState<YlState>(defaultYlState);

    useEffect(() => {
        videoId && fetchYoutubeVideoDetails(videoId)
            .then(res => {
                console.log('video res: ', res)
                setVideoDetails(res);
                return res;
            })
            .catch(err => console.log("err fetching video details"))
    }, [videoId])


    const updateState = (field: string, value: any) => {
        setYlState({...ylState, [field]: value});
    }

    const updateTime = (source: StartEndEnum, timeSource: MinuteSecondsEnum, value: number) => {
        updateState("loopTime", {
            ...ylState.loopTime,
            [source]: {
                ...ylState.loopTime[source],
                [timeSource]: value
            }
        })
    }


    const renderSkelton = () => {
        return (
            <>
                <Skeleton variant="text" sx={{fontSize: '1rem', marginTop: 5}}/>
                <Skeleton variant="circular" width={50} height={50} sx={{marginTop: 2}}/>
                <Skeleton variant="rectangular" height={200} sx={{marginTop: 2}}/>
            </>
        )
    }

    const handleLoopResponse = (response: any) => {
        console.log("handleLoopResponse :", response)
    }

    const handleClick = () => {
        // todo validate time

        // handle Click
        const request: YlRequest = {
            type: "START_LOOP",
            payload: {
                ...ylState.loopTime
            }
        }
        sendMessage(request, handleLoopResponse);
    }

    // Focus on loop button
    // make accordion controllable

    console.log("Selected time: ", ylState.loopTime)

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
                        {/*TODO - remove any*/}
                        <TextField
                            className="input-time-field"
                            type="number"
                            label="Minutes"
                            variant="standard"
                            size="small"
                            onChange={({target: {value}}: any) => updateTime(StartEndEnum.START, MinuteSecondsEnum.MINUTES, parseInt(value))}
                        />
                        <TextField
                            className="input-time-field"
                            type="number"
                            label="Seconds"
                            variant="standard"
                            size="small"
                            onChange={({target: {value}}: any) => updateTime(StartEndEnum.START, MinuteSecondsEnum.SECONDS, parseInt(value))}
                        />
                    </Box>
                    <Box className="loop-icon-container">
                        <CachedTwoToneIcon className="input-time" fontSize="small"/>
                    </Box>
                    <Box className="input-time">
                        <TextField
                            className="input-time-field"
                            type="number"
                            label="Minutes"
                            variant="standard"
                            size="small"
                            onChange={({target: {value}}: any) => updateTime(StartEndEnum.END, MinuteSecondsEnum.MINUTES, parseInt(value))}
                        />
                        <TextField
                            className="input-time-field"
                            type="number"
                            label="Seconds"
                            variant="standard"
                            size="small"
                            onChange={({target: {value}}: any) => updateTime(StartEndEnum.END, MinuteSecondsEnum.SECONDS, parseInt(value))}
                        />
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
                                Speed:
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
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleClick}
                    >
                        Put on Loop!
                    </Button>
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