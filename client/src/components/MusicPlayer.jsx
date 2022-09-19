import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Slider } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Modal from './Modal';
import LicenseSelect from './LicenseSelect';
import ShareModal from './ShareModal';
import ShareModalContent from './ShareModalContent';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { mobile, minitablet, tablet, largeTablet, smallTablet } from "../responsive";
import axios from 'axios';
import { Link } from "react-router-dom";
import { SERVER_URL } from '../requestMethods';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: black;
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    color: white;
    transition: 0.5s;
    display: block;

    ${props => {
        if (!props.isVisible) {
            return `
                height: 0px;
                overflow:hidden
            `;

        }
    }}
    
`;

const ProgressBar = styled.div`
    position: absolute;
    top: -14px;
    left: -1px;
    width: 100%;

    .progress-bar{
        --bar-bg: transparent;
        --seek-before-width: 0;
        --seek-before-color: teal;
        --knobby: teal;
        --selectedKnobby: white;
        --runnable-track-color: #004040;

        appearance: none;   
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background: var(--bar-bg);
        position: relative;
        outline: none;
        
    }

    /*progress bar safari */
    .progress-bar::-webkit-slider-runnable-track{
        appearance: none;   
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background: var(--runnable-track-color);
        position: relative;
        outline: none;
        cursor: pointer;
    }

    /*progress bar firefox */
    .progress-bar::-moz-range-track{
        appearance: none;   
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background: var(--runnable-track-color);
        position: relative;
        outline: none;
    }
    .progress-bar::-moz-focus-outer{
        border: 0;
    }

    /*progress bar - chrome and safari */
    .progress-bar::before{
        content: '';
        height: 2px;
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
        margin: -6px 0 0 0;
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

    .Link{
        text-decoration: none;
    }
`;
const Left = styled.div`
    display: flex;
    width: 33.3%;
    ${largeTablet({ flex: 1 })}
`;
const Center = styled.div`
    display: flex;
    width: 33.3%;
    height: 100%;
    justify-content: center;
    align-items: center;

    ${largeTablet({ justifyContent: "flex-end", marginRight: "20px", width: "60px" })}
`;
const Right = styled.div`
    display: flex;
    width: 33.3%;
    justify-content: flex-end;

    ${largeTablet({ display: "none" })}
    
`;
const Image = styled.div`
    height: 70px;
    width: 70px;
    background-image: url(${props => (props.image)});
    background-size: cover;
    background-position: center;
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`;
const TrackName = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: white;

    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }

`;
const ProducerName = styled.p`
    font-size: 14px;
`;
const Share = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media only screen and (max-width: 450px) {
    display: none;
  }
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

    @media only screen and (max-width: 450px) {
    display: none;
  }
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
    ${largeTablet({ display: "none" })}
`;
const PlayPause = styled.div`
    color: teal;
`;
const Forward5s = styled.div`
    ${largeTablet({ display: "none" })}
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
`;

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

    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    //const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [mute, setMute] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0.5);
    const [track, setTrack] = useState({ _id: "" });


    //references
    const audioPlayer = useRef(); //reference our audio component
    const myProgressBar = useRef(); //reference our progressbar
    const animationRef = useRef(); //reference the animation
    const modalRef = useRef()
    const shareModalRef = useRef()

    const onLoadedMetaData = () => {
        //const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(parseInt(audioPlayer.current.duration));
        myProgressBar.current.max = parseInt(audioPlayer.current.duration);
    }

    useEffect(() => {
        if (props.isPlaying) {
            props.setCurrentPlaying && props.setCurrentPlaying(track);

            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
        else {
            audioPlayer.current.pause();
            //removing cancelAnimationFrame fixes the issue with seekbeforewidth of the progress bar
            //cancelAnimationFrame(animationRef.current);
        }
    }, [props.isPlaying])

    useEffect(() => {
        props.setIsPlaying(true);
        props.setCurrentPlaying(track);

        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }, [track])

    //load new track and set state of 'track'
    useEffect(async () => {
        await axios.get(SERVER_URL + '/api/tracks/find/' + props.currentTrack)
            .then(response => {
                setTrack(response.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [props.currentTrack])


    useEffect(() => {
        if (audioPlayer) {
            audioPlayer.current.volume = volume;
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
        const prev = props.isPlaying;
        props.setIsPlaying(!prev);
        // if (!prev) {
        //     audioPlayer.current.play();
        //     animationRef.current = requestAnimationFrame(whilePlaying);
        // } else {
        //     audioPlayer.current.pause();
        //     cancelAnimationFrame(animationRef.current);
        // }
    }

    const changeRange = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = myProgressBar.current.value;
        }
        //taking value of duration from my database or audioPlayer because taking it from the duration state variable seems to really fuck up the progress bar seek before section
        myProgressBar.current.style.setProperty('--seek-before-width', `${(myProgressBar.current.value / audioPlayer.current.duration) * 100}%`)
        setCurrentTime(myProgressBar.current.value);

    }

    const whilePlaying = () => {
        myProgressBar.current.value = audioPlayer.current.currentTime ? audioPlayer.current.currentTime : 0;
        myProgressBar.current.style.setProperty('--seek-before-width', `${(myProgressBar.current.value / audioPlayer.current.duration) * 100}%`)
        setCurrentTime(myProgressBar.current.value);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const onEnded = () => {
        props.setIsPlaying(false);
        cancelAnimationFrame(animationRef.current);
    }

    const back5s = () => {
        myProgressBar.current.value = Number(myProgressBar.current.value) - 5;
        changeRange();
    }

    const forward5s = () => {
        myProgressBar.current.value = Number(myProgressBar.current.value) + 5;
        changeRange();
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

    const isTrackInCart = (track) => {
        let res = tracksInCart.filter(function (value) {
            return (value._id === track._id);
        });
        if (res.length === 0) {
            return (
                <BuyBTN onClick={() => { modalRef.current.open() }}>
                    <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                    <Plus>+</Plus>
                    <Amount>${track.nonprofitprice}</Amount>
                </BuyBTN>
            )
        } else {
            return (
                <BuyBTN onClick={() => { modalRef.current.open() }}>
                    <Amount>IN CART</Amount>
                </BuyBTN>
            )
        }
    }

    return (
        <Container isVisible={props.musicPlayerVisible}>
            <audio ref={audioPlayer} id="audio-element"
                src={track.mp3}
                preload='metadata'
                onLoadedMetadata={onLoadedMetaData}
                onEnded={onEnded}
            >
            </audio>

            <ProgressBar>
                <input ref={myProgressBar} className='progress-bar' onChange={changeRange} type="range" step="0.05" defaultValue="0" />
            </ProgressBar>
            <Wrapper>
                <Left>
                    <Image image={track.img}></Image>
                    <Info>
                        <Link className='Link' to={"/trackinfo/" + track._id}><TrackName>{track.trackname}</TrackName></Link>
                        <ProducerName>{track.producername}</ProducerName>
                    </Info>
                    <Share onClick={() => { shareModalRef.current.open() }}><ShareIcon /></Share>
                    {isTrackInCart(track)}
                </Left>

                <Center>
                    <Back5s onClick={back5s}><Replay5Icon style={{ fontSize: "26px", cursor: "pointer" }} /></Back5s>
                    <PlayPause onClick={togglePlayPause}>
                        {props.isPlaying ? <PauseCircleIcon style={{ fontSize: "56px", cursor: "pointer" }} /> : <PlayCircleIcon style={{ fontSize: "56px", cursor: "pointer" }} />}
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

            <Modal ref={modalRef}>
                <LicenseSelect track={track} />
            </Modal>

            <ShareModal ref={shareModalRef}>
                <ShareModalContent page={"trackinfo/"} trackId={track._id} />
            </ShareModal>


        </Container>
    )
}

export default MusicPlayer