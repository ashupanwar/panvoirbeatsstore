import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Slider } from '@mui/material';

import AudioVisualizer from './AudioVisualizer';

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: black;
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    color: white;
`;

const ProgressBar = styled.div`
    position: absolute;
    top: -14px;
    left: 0px;
    width: 100%;

    .progress-bar{
        --bar-bg: black;
        --seek-before-width: 0;
        --seek-before-color: teal;
        --knobby: teal;
        --selectedKnobby: white;

        appearance: none;   
        width: 100%;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
        
    }

    /*progress bar safari */
    .progress-bar::-webkit-slider-runnable-track{
        appearance: none;   
        width: 100%;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
    }

    /*progress bar firefox */
    .progress-bar::-moz-range-track{
        appearance: none;   
        width: 100%;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
    }
    .progress-bar::-moz-focus-outer{
        border: 0;
    }

    /*progress bar - chrome and safari */
    .progress-bar::before{
        content: '';
        height: 5px;
        width: var(--seek-before-width);
        background-color: var(--seek-before-color);
        border-top-left-radius:10px;
        border-bottom-left-radius:10px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
    }

       /*progress bar - firefox */
    .progress-bar::-moz-range-progress{
        background-color: var(--seek-before-color);
        border-top-left-radius:10px;
        border-bottom-left-radius:10px;
        height: 5px;
    }

    /*Knobby - Chrome safari */
    .progress-bar::-webkit-slider-thumb{
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50px;
        border: none;
        background-color: var(--knobby);
        cursor: pointer;
        position: relative;
        margin: -5px 0 0 0;
        z-index: 3;
        box-sizing: border-box;

    }

    /*knobby while dragging - chrom and safari*/
    .progress-bar:active::-webkit-slider-thumb{
        transform: scale(1.1);
        background: var(--selectedKnobby);
    }

    /*Knobby - firefox */ 
    .progress-bar::-moz-range-thumb{
        height: 15px;
        width: 15px;
        border-radius: 50px;
        border: transparent;
        background-color: var(--knobby);
        cursor: pointer;
        position: relative;
        z-index: 3;
        box-sizing: border-box;
    }


    /*knobby while dragging - firefox*/
    .progress-bar:active::-moz-range-thumb{
        transform: scale(1.1);
        background: var(--selectedKnobby);
    }

    

`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left = styled.div`
    display: flex;
    width: 33.3%;
`;
const Center = styled.div`
    display: flex;
    width: 33.3%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Right = styled.div`
    display: flex;
    width: 33.3%;
    justify-content: space-between;
    
`;
const Image = styled.div`
    height: 70px;
    width: 70px;
    background-image: url('img/FeaturedImg.jpg');
    background-size: cover;
    background-position: center;
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`;
const TrackName = styled.p`
    font-size: 18px;
    font-weight: bold;
`;
const ProducerName = styled.p`
    font-size: 14px;
`;
const Share = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
`;

const BuyBTN = styled.div`
    min-width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    color: black;
    margin-left: 20px;
    cursor: pointer;
`;

const Plus = styled.div`
    height: 100%; 
    position: relative;
    top: 8px;
    left: -2px;
    font-weight: bold;

`;

const Amount = styled.p`
    font-weight: bold;
    margin-left: 3px;
`;

const Back5s = styled.div`

`;
const PlayPause = styled.div`
    color: teal;
`;
const Forward5s = styled.div`

`;

const Time = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
`;

const CurrentTime = styled.div`
    margin-right: 4px;
`;
const Duration = styled.div`
    margin-right: 20px;
    margin-left: 4px;
    color: teal;
`;

const VolumeContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

const Volume = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100px;

    //volume bar
    .volume-bar{
        --bar-bg: gray;
        --seek-before-width: 0;
        --seek-before-color: white;
        --knobby: white;
        --selectedKnobby: white;

        appearance: none;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
        
    }

    /*volume bar safari */
    .volume-bar::-webkit-slider-runnable-track{
        appearance: none;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
    }

    /*volume bar firefox */
    .volume-bar::-moz-range-track{
        appearance: none;
        height: 5px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
    }
    .volume-bar::-moz-focus-outer{
        border: 0;
    }

    /*volume bar - chrome and safari */
    .volume-bar::before{
        content: '';
        height: 5px;
        width: var(--seek-before-width);
        background-color: var(--seek-before-color);
        border-top-left-radius:10px;
        border-bottom-left-radius:10px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
    }

       /*progress bar - firefox */
    .volume-bar::-moz-range-progress{
        background-color: var(--seek-before-color);
        border-top-left-radius:10px;
        border-bottom-left-radius:10px;
        height: 5px;
    }

    /*Knobby - Chrome safari */
    .volume-bar::-webkit-slider-thumb{
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50px;
        border: none;
        background-color: var(--knobby);
        cursor: pointer;
        position: relative;
        margin: -5px 0 0 0;
        z-index: 3;
        box-sizing: border-box;

    }

    /*knobby while dragging - chrom and safari*/
    .volume-bar:active::-webkit-slider-thumb{
        transform: scale(1.1);
        background: var(--selectedKnobby);
    }

    /*Knobby - firefox */ 
    .volume-bar::-moz-range-thumb{
        height: 15px;
        width: 15px;
        border-radius: 50px;
        border: transparent;
        background-color: var(--knobby);
        cursor: pointer;
        position: relative;
        z-index: 3;
        box-sizing: border-box;
    }


    /*knobby while dragging - firefox*/
    .volume-bar:active::-moz-range-thumb{
        transform: scale(1.1);
        background: var(--selectedKnobby);
    }
`;

const PSlider = styled(Slider)(({ theme, ...props }) => ({
    "& .MuiSlider-thumb": {
        backgroundColor: "teal" //color of thumbs
    },
    "& .MuiSlider-rail": {
        color: "teal" ////color of the slider outside  teh area between thumbs
    },
    "& .MuiSlider-track": {
        color: "teal" ////color of the slider outside  teh area between thumbs
    }
}))

const VSlider = styled(Slider)(() => ({

    marginLeft: "10px",

    "& .MuiSlider-thumb": {
        backgroundColor: "white", //color of thumbs
        width: 12,
        height: 12,
    },
    "& .MuiSlider-rail": {
        color: "white", ////color of the slider outside  teh area between thumbs
    },
    "& .MuiSlider-track": {
        color: "white" ////color of the slider outside  teh area between thumbs

    }
}))


const MusicPlayer = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [mute, setMute] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0.5);

    //references
    const audioPlayer = useRef(); //reference our audio component
    const myProgressBar = useRef(); //reference our progressbar


    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    useEffect(() => {
        if (audioPlayer) {
            audioPlayer.current.volume = volume;
        }
        if (isPlaying) {
            setInterval(() => {
                setCurrentTime(audioPlayer.current.currentTime);
            }, 100)
        }

    }, [volume])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prev = isPlaying;
        setIsPlaying(!prev);
        if (!prev) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    }

    const changeRange = (e) => {
        setCurrentTime(Number(e.target.value))
        audioPlayer.current.currentTime = currentTime;
    }

    const back5s = () => {
        if (Number(currentTime) - 5 > 0) {
            setCurrentTime(Number(currentTime) - 5);
            audioPlayer.current.currentTime = currentTime;
        }
    }

    const forward5s = () => {
        if (Number(currentTime) + 5 < duration) {
            setCurrentTime(Number(currentTime) + 5);
            audioPlayer.current.currentTime = currentTime;
        }
    }

    const toggleMute = () => {

        if (mute) {
            setVolume(prevVolume)
        } else {
            setPrevVolume(volume);
            setVolume(0)
        }
        setMute(!mute);
    }

    const changeVolume = (e, v) => {
        setVolume(parseFloat(e.target.value))
    }


    return (
        <Container>
            <audio ref={audioPlayer} id="audio-element"
                src='audio/mine.mp3'
                preload='metadata'
            >
            </audio>
            <ProgressBar>
                <PSlider size="small" defaultValue="0" onChange={(e, v) => { changeRange(e) }} value={currentTime} max={duration} min={0} step={1} />
                <input style={{ display: "none" }} className='progress-bar' onChange={changeRange} type="range" defaultValue="0" />
            </ProgressBar>
            <Wrapper>
                <Left>
                    <Image></Image>
                    <Info>
                        <TrackName>Diabla</TrackName>
                        <ProducerName>panvoirbeats</ProducerName>
                    </Info>
                    <Share><ShareIcon /></Share>
                    <BuyBTN>
                        <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                        <Plus>+</Plus>
                        <Amount>$29.98</Amount>
                    </BuyBTN>
                </Left>

                <Center>
                    <Back5s onClick={back5s}><Replay5Icon style={{ fontSize: "26px", cursor: "pointer" }} /></Back5s>
                    <PlayPause onClick={togglePlayPause}>
                        {isPlaying ? <PauseCircleIcon style={{ fontSize: "56px", cursor: "pointer" }} /> : <PlayCircleIcon style={{ fontSize: "56px", cursor: "pointer" }} />}
                    </PlayPause>
                    <Forward5s onClick={forward5s}><Forward5Icon style={{ fontSize: "26px", cursor: "pointer" }} /></Forward5s>
                </Center>

                <Right>
                    <VolumeContainer>
                        <Volume>
                            {volume > 0 ? <VolumeUpIcon style={{ cursor: 'pointer' }} onClick={toggleMute} /> : <VolumeOffIcon style={{ cursor: 'pointer' }} onClick={toggleMute} />}
                            <VSlider min={0} max={1} defaultValue={0.5} step={0.01} value={volume} onChange={changeVolume} />
                        </Volume>
                    </VolumeContainer>

                    <Time>
                        <CurrentTime>{calculateTime(currentTime)}</CurrentTime>
                        /
                        <Duration>{(duration && !isNaN(duration)) && calculateTime(duration)}</Duration>
                    </Time>

                </Right>




            </Wrapper>


        </Container>
    )
}

export default MusicPlayer

