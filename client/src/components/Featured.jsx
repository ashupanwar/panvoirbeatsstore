import { MusicNoteRounded, PauseRounded, PlayArrowRounded, ShareOutlined } from '@material-ui/icons';
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AudioVisualizer from './AudioVisualizer';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import LicenseSelect from './LicenseSelect';
import ShareModal from './ShareModal';
import ShareModalContent from './ShareModalContent';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { mobile } from "../responsive";
import { tablet } from "../responsive";

//Dummy data for suggestions
import tracks from '../tracks'
import { teal } from '@material-ui/core/colors';
import axios from 'axios';
import featuredImg from '../img/background1.jpg'
import { PropaneSharp } from '@mui/icons-material';
import { SERVER_URL } from '../requestMethods';

//const SERVER_URL = 'http://localhost:5000';


const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.1),rgba(0,0,0,1)),url(${featuredImg});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
    
    .Link{
        color: black;
        text-decoration: none;
    }

    ${tablet({ display: "flex", alignItems: "flex-start", justifyContent: "center", height: "60vh", paddingTop: "30px" })}
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    position: relative;
    box-sizing: border-box;
    padding-top: 200px;

    ${tablet({ paddingTop: "0px" })}
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;
    height: 40px;
    background-color: white;
    padding: 14px 10px;
    position: relative;
    border-radius: 6px;

    ${tablet({ display: "none", })}
`;
const Input = styled.input`
    flex: 1;
    height: 100%;
    margin: 0px 10px;
    font-size: 20px;
    font-weight: 500;
    outline: none;
    border: none;
`;
const Search = styled.button`
    height: 52px;
    width: 80px;
    font-weight: bold;
    background-color: teal;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

const Suggestions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 6px;
    top: 80px;
    left: 0;
    max-height: 150px;
    width: 100%;
    overflow: hidden;
    background-color: white;
    z-index: 3;
`;

const ResultContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    cursor: pointer;

    &:hover{
        background-color: #dbdbdb;
    }

`;

const Title = styled.p`
    color: black;
    font-weight: 500;
    margin-left: 10px;
`;

const FeaturedTrackContainer = styled.div`
    display: flex;
    width: 550px;
    height: 150px;
    margin-top: 20px;

    ${tablet({ flexDirection: "column", alignItems: "center" })}
`;
const Left = styled.div`
    width: 150px;
    height: 150px;

    
`;
const Image = styled.div`
    width: 150px;
    height: 150px;
    background-image: url(${props => (props.img)});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
`;
const PlayPauseButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    height: 60px;
    width: 60px;    
    border-radius: 50%;
    background-color: rgba(	0, 128, 128,0.9);
    cursor: pointer;
`;
const Right = styled.div`
    width: 100%;
    max-height: 150px; 
    margin-left: 26px;
    padding: 10px 0px;

    ${tablet({ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "0px" })}
`;
const Details = styled.p`
    font-weight: 600;
    color: white;
`;
const TrackTitle = styled.h1`
    font-weight: bold;
    color: white;
    margin-top: 10px;
`;
const PriceContainer = styled.div`
    display: flex;
    margin-top: 16px;
    position: relative;

    ${mobile({ flexDirection: "column-reverse", alignItems: "center" })}
`;
const Price = styled.div`
    min-width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
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

const Share = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    width: 46px;
    background-color: white;
    margin-left: 10px;
    border-radius: 6px;
    cursor: pointer;

    ${mobile({ display: "none" })}
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
`;

const A = styled.a`
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`;

const VisualizerContainer = styled.div`
    height: 80px;
    margin-top: 40px;
    min-width: 1000px;
    transition: opacity 0.3s ease;
    ${props => {
        if (props.isPlaying) {
            return `
                opacity: 1;
            `;

        } else {
            return `
                opacity: 0;
            `;
        }
    }
    }
`;

const PriceLeft = styled.div`
    ${mobile({ marginTop: "16px" })}
`;
const PriceRight = styled.div`
    display: flex;
`;



const Featured = (props) => {

    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    const navigate = useNavigate();

    const modalRef = useRef()
    const shareModalRef = useRef()

    const [tracksList, setTracksList] = useState(new Array);
    const [isPlaying, setIsPlaying] = useState(false);
    const [featuredTrack, setFeaturedTrack] = useState({ img: "", tags: [], bpm: "", trackname: "", nonprofitprice: "" });


    //--Code for detecting click outside of a div-------------
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTracksList(new Array);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    //----------------------------------------------------------


    useEffect(async () => {
        let topfeaturedtrack = await axios.get(SERVER_URL + "/api/featured?top=1")
            .then(async (response) => {
                let trackFromFeaturedTrack = await axios.get(SERVER_URL + "/api/tracks/find/" + response.data[0].trackId)
                    .then(response => {
                        setFeaturedTrack(response.data)
                    }).catch(err => {
                        console.log(err);
                    });

            })
    }, [])

    useEffect(() => {
        if (props.currentPlaying) {
            if (props.currentPlaying._id !== featuredTrack._id) {
                setIsPlaying(false);
            } else {
                //setIsPlaying(true);
            }
        }
    }, [featuredTrack])

    useEffect(() => {
        const input = document.getElementById('featured-input');
        input.value = props.searchQuery
    }, [props.searchQuery]);

    useEffect(() => {
        if (isPlaying) {
            props.setCurrentTrack && props.setCurrentTrack(featuredTrack._id);
            props.setMusicPlayerVisible(true);
            props.setIsPlaying(true);
        }
        else if (!isPlaying) {
            if (props.currentPlaying && (props.currentPlaying._id === featuredTrack._id)) {
                props.setIsPlaying(false);
            }
        }
    }, [isPlaying])

    useEffect(() => {
        if (props.currentPlaying && (props.currentPlaying._id === featuredTrack._id)) {
            if (props.isPlaying) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        } else {

        }
    }, [props.isPlaying])

    const isTrackInCart = (track) => {
        let res = tracksInCart.filter(function (value) {
            return (value._id === track._id);
        });
        if (res.length === 0) {
            return (
                <Price onClick={() => { modalRef.current.open() }}>
                    <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                    <Plus>+</Plus>
                    <Amount>${featuredTrack.nonprofitprice}</Amount>
                </Price>
            )
        } else {
            return (
                <Price onClick={() => { modalRef.current.open() }}>
                    <Amount>IN CART</Amount>
                </Price>
            )
        }
    }

    const showSuggestions = (e) => {
        if (e.target.value) {


            const findSuggestions = async () => {
                await axios.get(SERVER_URL + '/api/tracks?search=' + e.target.value)
                    .then(response => {
                        setTracksList(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            };

            //console.log(e.target.value);
            let q = e.target.value.trim();
            q && findSuggestions();

        } else {
            setTracksList(new Array);
        }
    };

    const hideSuggestions = () => {
        setTracksList(new Array);
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    //go to all beats page with this tag as search query
    const searchForTag = () => {
        console.log("go to search page");
    };

    const handleSearch = () => {
        const input = document.getElementById('featured-input');
        let q = input.value.trim();
        q && navigate('/allbeats/' + q)
    };

    return (
        <Container>
            <Wrapper>
                <SearchContainer ref={wrapperRef}>
                    <Input id='featured-input' onKeyUp={showSuggestions} placeholder='What type of track are you looking for?' />
                    <Search onClick={handleSearch}>SEARCH</Search>
                    <Suggestions>
                        {tracksList.slice(0, 3).map(track => (
                            <ResultContainer onClick={() => { navigate('/trackInfo/' + track._id) }} key={track._id}>
                                <MusicNoteRounded style={{ marginLeft: 10 }} />
                                <Title>{track.trackname}</Title>
                            </ResultContainer>
                        ))}
                    </Suggestions>
                </SearchContainer>


                <FeaturedTrackContainer>
                    <Left>
                        <Image img={featuredTrack.img} onClick={togglePlay}>
                            <PlayPauseButton>
                                {isPlaying ? <PauseRounded style={{ fontSize: 45 }} /> : <PlayArrowRounded style={{ fontSize: 45 }} />}
                            </PlayPauseButton>
                        </Image>
                    </Left>
                    <Right>
                        <Details>Featured Track  •  {featuredTrack.bpm}BPM</Details>
                        <TrackTitle>{featuredTrack.trackname}</TrackTitle>
                        <PriceContainer>
                            <PriceLeft>
                                {isTrackInCart(featuredTrack)}
                            </PriceLeft>
                            <PriceRight>
                                <Share onClick={() => { shareModalRef.current.open(); }}>
                                    <ShareOutlined />
                                </Share>
                                {featuredTrack.tags.slice(0, 2).map(tag => (
                                    <Tag>
                                        <Link className="Link" to={"/allbeats/" + tag}>
                                            #
                                            <A onClick={searchForTag}>{tag}</A>
                                        </Link>
                                    </Tag>
                                ))}
                            </PriceRight>
                        </PriceContainer>
                    </Right>
                </FeaturedTrackContainer>

                <Modal ref={modalRef}>
                    <LicenseSelect track={featuredTrack} />
                </Modal>

                <ShareModal ref={shareModalRef}>
                    <ShareModalContent page={"trackinfo/"} trackId={featuredTrack._id} />
                </ShareModal>


            </Wrapper>
        </Container >
    )
}

export default Featured