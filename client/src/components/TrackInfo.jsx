import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import axios from 'axios';
import Loading from './Loading';
import starsImg from '../img/stars.jpg'
import { Link } from "react-router-dom";
import Modal from './Modal';
import LicenseSelect from './LicenseSelect';
import ShareModal from './ShareModal';
import ShareModalContent from './ShareModalContent';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { mobile, largeTablet, tablet, smallTablet } from "../responsive";
import { SERVER_URL } from '../requestMethods';

//import tracks from '../tracks';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    height: 400px;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${starsImg});
    background-size: cover;
    background-position: top;
    color: white;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    .Link{
        color: black;
        text-decoration: none;
    }

    ${largeTablet({ height: "600px" })}
    ${mobile({ height: "700px" })}
`;
const Wrapper = styled.div`
    width: 75%;
    height: fit-content;
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 40px;

    ${largeTablet({ width: "90%", flexDirection: "column", alignItems: "center" })}
    
`;
const Left = styled.div`
    width: 200px;
    height: 200px;
`;
const Center = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    flex: 1;
    box-sizing: border-box;
    padding-left: 20px;
    justify-content: space-between;

    ${largeTablet({ alignItems: "center", paddingLeft: "0px" })}
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${props => (props.img)});
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    ${largeTablet({ marginTop: "10px" })}
`;
const PlayPauseButton = styled.div`
    cursor: pointer;
`;
const Title = styled.div`
    font-size: 40px;
    margin-bottom: 4px;
    margin-left: 4px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const ProducerName = styled.div`
    height: 26px;
    font-size: 16px;
    margin-left: 6px;

`;
const InfoContainer = styled.div`
    display: flex;
    flex: 1;
    ${largeTablet({ marginTop: "6px" })}
`;
const BpmContainer = styled.div`
    display: flex;
    align-items: center;
`;
const BpmLogo = styled.div`

`;
const BpmValue = styled.div`
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 16px;
    
`;
const KeyContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`;
const KeyLogo = styled.div`
    margin-bottom: 2px;
`;
const KeyValue = styled.div`
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 16px;
    margin-left: 3px;
`;
const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`;
const TimeLogo = styled.div`
    margin-bottom: 2px;
`;
const TimeValue = styled.div`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 6px;
    margin-left: 3px;
`;
const Desc = styled.div`
    flex: 1;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;

    ${largeTablet({ marginTop: "6px", textAlign: "center" })}
`;
const ButtonsContainer = styled.div`
    flex: 1;
    display: flex;

    ${largeTablet({ marginTop: "26px", flexWrap: "wrap", justifyContent: "center" })}
`;

const BuyShare = styled.div`
    display: flex;
`;

const BuyBTN = styled.div`
    width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    color: black;
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
const ShareButton = styled.div`
    width: 110px;
    height: 46px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    margin-left: 10px;
`;

const Tags = styled.div`
    display: flex;
    margin-left: auto;

    ${largeTablet({ marginLeft: "0", flexWrap: "wrap", justifyContent: "center" })}
    ${smallTablet({ marginTop: "16px", })}
`;

const Tag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    height: 46px;
    background-color: white;
    border-radius: 20px;
    margin-left: 6px;
    font-weight: 600;
    color: black;

    ${smallTablet({ marginBottom: "6px", })}
`;
const TagName = styled.a`
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;

const TrackInfo = (props) => {

    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    const modalRef = useRef()
    const shareModalRef = useRef()

    const [isPlaying, setIsPlaying] = useState(false);
    const [track, setTrack] = useState({ tags: [] });
    const [trackId, setTrackId] = useState(props.trackId);


    useEffect(() => {
        setTrackId(props.trackId);
        if (props.currentPlaying) {
            if ((props.trackId === props.currentPlaying._id) && props.isPlaying) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    }, [props.trackId])

    useEffect(() => {
        const getProduct = async () => {
            try {
                await axios.get(SERVER_URL + "/api/tracks/find/" + trackId)
                    .then(response => {
                        setTrack(response.data);
                    });

            } catch { }
        };
        getProduct();
    }, [trackId]);


    useEffect(() => {

        if (props.currentPlaying) {
            //this track paused and is currently loaded in the music player
            if (!isPlaying && (props.trackId === props.currentPlaying._id)) {
                props.setIsPlaying(false);
            }
            //this track playing and is currently loaded in the music player
            else if (isPlaying && (props.trackId === props.currentPlaying._id)) {
                props.setIsPlaying(true);
            }
            //this track is not loaded in the music player and when we click to play it loads the track into the musicplayer
            else if (isPlaying) {
                props.setCurrentTrack && props.setCurrentTrack(props.trackId);
                props.setMusicPlayerVisible(true);
            }
        }

    }, [isPlaying]);

    //helps in linking the musicplayer play pause button to the track info play pause button
    useEffect(() => {

        if (props.isPlaying && (props.trackId === props.currentPlaying._id)) {
            setIsPlaying(true);
        }
        // else {
        //     setIsPlaying(false);
        // }


    }, [props.isPlaying])

    const togglePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
        //setIsPlaying(!isPlaying);
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
        <Container>

            {!track ? <Loading></Loading> :
                <Wrapper>
                    <Left>
                        <Image img={track.img}></Image>
                    </Left>

                    <Center>
                        <TitleContainer>
                            <PlayPauseButton onClick={togglePlay}>
                                {isPlaying ? <PauseCircleIcon style={{ fontSize: 50 }} /> : <PlayCircleIcon style={{ fontSize: 50 }} />}
                            </PlayPauseButton>
                            <Title>{track.trackname}</Title>
                        </TitleContainer>
                        <ProducerName>{track.producername}</ProducerName>
                        <InfoContainer>
                            <BpmContainer>
                                <BpmLogo><FormatBoldIcon style={{ fontSize: 20 }} /></BpmLogo>
                                <BpmValue>{track.bpm}</BpmValue>
                            </BpmContainer>

                            <KeyContainer>
                                <KeyLogo><MusicNoteIcon style={{ fontSize: 16 }} /></KeyLogo>
                                <KeyValue>{track.key}</KeyValue>
                            </KeyContainer>

                            <TimeContainer>
                                <TimeLogo><AccessTimeFilledIcon style={{ fontSize: 16 }} /></TimeLogo>
                                <TimeValue>{track.uploaddate}</TimeValue>
                            </TimeContainer>
                        </InfoContainer>

                        <Desc>{track.desc}</Desc>

                        <ButtonsContainer>
                            <BuyShare>
                                {isTrackInCart(track)}
                                <ShareButton onClick={() => { shareModalRef.current.open() }}>
                                    <ShareIcon style={{ fontSize: 16, marginRight: 4 }} /> SHARE
                                </ShareButton>
                            </BuyShare>
                            <Tags>

                                {track.tags.slice(0, 3).map((tag) => (
                                    <Tag>
                                        #
                                        <TagName>
                                            <Link className="Link" to={"/allbeats/" + tag}>
                                                {tag}
                                            </Link>
                                        </TagName>
                                    </Tag>
                                ))}

                            </Tags>
                        </ButtonsContainer>
                    </Center>
                </Wrapper>
            }

            <Modal ref={modalRef}>
                <LicenseSelect track={track} />
            </Modal>

            <ShareModal ref={shareModalRef}>
                <ShareModalContent page={"trackinfo/"} trackId={track._id} />
            </ShareModal>

        </Container >
    )
}

export default TrackInfo