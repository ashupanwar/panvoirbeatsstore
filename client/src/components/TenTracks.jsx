import React, { useEffect, useState } from 'react'
import { ShareOutlined } from '@material-ui/icons';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import axios from 'axios';
import { SERVER_URL } from '../requestMethods';

import styled from 'styled-components';
import AllTracks from './AllTracks';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    background-color: black;
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    background-color: black;
`;

const Headings = styled.div`
    display: flex;
    justify-content: space-between;
    height: 20px;
    color: white;
    font-size: 14px;
    font-weight: 400;
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
`;
const Time = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Bpm = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Tags = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const ShareATC = styled.div`
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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


const TenTracks = () => {

    // const [currentTracks, setCurrentTracks] = useState([])

    // useEffect(() => {
    //     //fetch all tracks from server and store in tracks
    //     const fetchTracks = async () => {
    //         try {

    //             //for only the latest 10 tracks
    //             let res = await axios.get(SERVER_URL + '/api/tracks?new=true');

    //             setCurrentTracks(res.data);

    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     fetchTracks();
    // }, []);

    return (
        <Container>
            <AllTracks from="tentracks" query={null} />

        </Container>
    )
}

export default TenTracks