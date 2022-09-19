import React, { useEffect, useState, useRef } from 'react'
import { ShareOutlined } from '@material-ui/icons';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import axios from 'axios';
import { Link } from "react-router-dom";
import Modal from './Modal';
import LicenseSelect from './LicenseSelect';
import ShareModal from './ShareModal';
import ShareModalContent from './ShareModalContent';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { SERVER_URL } from '../requestMethods';


import styled from 'styled-components';

//import tracks from '../tracks'

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    min-height: 300px;
    background-color: black;
    display: flex;
    justify-content: center;

    .Link{
        color: black;
        text-decoration: none;
    }
`;

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    background-color: black;

    ${tablet({ width: "90%" })}
`;

const Headings = styled.div`
    display: flex;
    justify-content: space-between;
    height: 20px;
    color: white;
    font-size: 14px;
    font-weight: 400;

    ${tablet({ display: "none" })}
`;

const ThumbnailConatiner = styled.div`
    width: 70px;
`;

const TitleContainer = styled.div`
flex: 7;
`;
const TimeContainer = styled.div`
flex: 2;
`;
const BPMContainer = styled.div`
flex: 2;
`;
const TagsContainer = styled.div`
flex: 5;
`;

const ShareContainer = styled.div`
    width: 70px;
`;
const ATCContainer = styled.div`
    width: 150px;
`;


const TitleHeading = styled.p`
    margin-left: 6px;
`;
const TimeHeading = styled.p`
`;
const BPMHeading = styled.p`
`;
const TagsHeading = styled.p`
    margin-left: 6px;
`;

const CardContainer = styled.div`
    
`;

const Card = styled.div`
    height: 70px;
    width: 100%;
    background-color: black;
    display: flex;
    cursor: pointer;
`;



const Thumbnail = styled.div`
    height: 100%;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.div`
    flex: 7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    overflow: hidden;
`;
const Time = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${tablet({ display: "none" })}
`;
const Bpm = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${tablet({ display: "none" })}
`;
const Tags = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${tablet({ display: "none" })}
`;
const ShareATC = styled.div`
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${tablet({ width: "190px" })}
    ${mobile({ width: "130px" })}
`;

const Image = styled.div`
    height: 80%;
    width: 80%;
    border-radius: 6px;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;

`;
const TitleText = styled.p`
    margin-left: 6px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const TimeText = styled.p`
    font-weight: 600;
    color: white;
`;
const BpmText = styled.p`
    font-weight: 600;
    color: white;
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
const TagName = styled.a`
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;
const ShareBTN = styled.div`

    width: 46px;
    height: 46px;
    border-radius: 6px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    ${mobile({ display: "none" })}

`;
const ATCBTN = styled.div`
    min-width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
`;

const Plus = styled.p`
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

const BRContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const BR = styled.hr`
    background-color: rgba(255,255,255,0.2);
    height: 0.1px;
    border: none;
    width: 94%;
    
`;

const LoadingFinishedStyle = {

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    textAlign: 'center',
    color: 'white',
    backgroundColor: "black"

}

const Alert = styled.p`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

const AllTracks = (props) => {

    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    const modalRef = useRef()
    const shareModalRef = useRef()

    const [shareTrackId, setShareTrackId] = useState(null);

    const [currentTracks, setCurrentTracks] = useState([]);
    const [trackId, setTrackId] = useState(props.trackId);

    //for linking license modal to the track that is clicked
    const [ATCSelected, setATCSelected] = useState(null);

    useEffect(() => {
        setTrackId(props.trackId);
    }, [props.trackId])

    useEffect(() => {

        //To avoid loading data twice when we click on tag (first normal data is loaded and then the tag data is loaded which causes ambiguity sometimes)
        if (props.query) return;

        //fetch all tracks from server and store in tracks
        const fetchTracks = async () => {
            try {

                //from allbeats page
                if (props.from === 'allbeats') {
                    //console.log("allbeats")
                    await axios.get(SERVER_URL + '/api/tracks')
                        .then(response => {
                            setCurrentTracks(response.data);
                            //console.log(response.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else if (props.from === 'tentracks') {
                    //console.log("tentracks")
                    await axios.get(SERVER_URL + '/api/tracks?new=true')
                        .then(response => {
                            setCurrentTracks(response.data);
                            //console.log(response.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else if (props.from === 'related') {
                    //handled in other useEffect
                }


            } catch (err) {
                console.log(err);
            }
        }
        fetchTracks();
    }, []);

    useEffect(async () => {
        try {
            if (props.from === 'related') {
                await axios.get(SERVER_URL + '/api/tracks/find/' + trackId)
                    .then(async response => {
                        let tag = response.data.tags[0];
                        await axios.get(SERVER_URL + '/api/tracks/related?tag=' + tag)
                            .then(response => {
                                setCurrentTracks(response.data);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }).catch(err => {
                        console.log(err);
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }, [trackId])


    //use effect for executing query search
    useEffect(() => {
        //using null query when called from tentracks or related.
        if (props.query !== null) {
            getData();
        }
    }, [props.query])


    const getData = () => {

        let res;

        const fetchData = async () => {
            if (props.query) {
                res = await axios.get(SERVER_URL + '/api/tracks?search=' + props.query);
                //console.log(props.query);
            }
            else {
                res = await axios.get(SERVER_URL + '/api/tracks');
            }
            //console.log(res.data);
            if (res.data.length != 0) {
                setCurrentTracks(res.data);
            }
        }

        fetchData();

    }

    const isTrackInCart = (track) => {
        let res = tracksInCart.filter(function (value) {
            return (value._id === track._id);
        });
        if (res.length === 0) {
            return (
                <ATCBTN onClick={() => { setATCSelected(track); modalRef.current.open() }}>
                    <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                    <Plus>+</Plus>
                    <Amount>${track.nonprofitprice}</Amount>
                </ATCBTN>
            )
        } else {
            return (
                <ATCBTN onClick={() => { setATCSelected(track); modalRef.current.open() }}>
                    <Amount>IN CART</Amount>
                </ATCBTN>
            )
        }
    }

    return (
        <Container>
            <Wrapper>
                <Headings>

                    <ThumbnailConatiner></ThumbnailConatiner>

                    <TitleContainer>
                        <TitleHeading>TITLE</TitleHeading>
                    </TitleContainer>
                    <TimeContainer>
                        <TimeHeading>TIME</TimeHeading>
                    </TimeContainer>
                    <BPMContainer>
                        <BPMHeading>BPM</BPMHeading>
                    </BPMContainer>
                    <TagsContainer>
                        <TagsHeading>TAGS</TagsHeading>
                    </TagsContainer>
                    <ShareContainer></ShareContainer>
                    <ATCContainer></ATCContainer>
                </Headings>
                {(!currentTracks.length) ? <Alert>No results</Alert> : currentTracks.map((track => {
                    return <CardContainer key={track._id}>
                        <Card >
                            <Link className="Link" to={"/trackinfo/" + track._id}>
                                <Thumbnail>
                                    <Image image={track.img}></Image>
                                </Thumbnail>
                            </Link>
                            <Title>
                                <TitleText>{track.trackname}</TitleText>
                            </Title>
                            <Time>
                                <TimeText>{track.trackduration}</TimeText>
                            </Time>
                            <Bpm>
                                <BpmText>{track.bpm}</BpmText>
                            </Bpm>
                            <Tags>
                                {track.tags.slice(0, 2).map(tag => (
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
                            <ShareATC>
                                <ShareBTN onClick={() => { setShareTrackId(track._id); shareModalRef.current.open(); }}>
                                    <ShareOutlined />
                                </ShareBTN>
                                {isTrackInCart(track)}
                            </ShareATC>
                        </Card>
                        <BRContainer>
                            <BR></BR>
                        </BRContainer>

                        <Modal ref={modalRef}>
                            <LicenseSelect track={ATCSelected} />
                        </Modal>

                        <ShareModal ref={shareModalRef}>
                            <ShareModalContent page={"trackinfo/"} trackId={shareTrackId} />
                        </ShareModal>

                    </CardContainer>
                }))}
            </Wrapper>

        </Container>
    )
}

export default AllTracks

