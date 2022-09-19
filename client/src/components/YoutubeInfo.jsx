import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import YoutubeEmbed from './YoutubeEmbed';
import YoutubeEmbedMobile from './YoutubeEmbedMobile';
import backgroundimg from '../img/background2.png'
import { mobile } from "../responsive";
import { tablet } from "../responsive";

const YT_API_KEY = "AIzaSyCv_ZKxwzUvfwd_xv_VBX3LwVap3WLZldw";


const Container = styled.div`
    height: 500px;
    width: 100vw;
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${backgroundimg});
    background-size: cover;
    background-position: 0% 8%;
    background-repeat: no-repeat;
    display: flex;

    ${tablet({ flexDirection: "column-reverse", height: "630px" })}
`;

const Left = styled.div`
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    color: white;
    ${tablet({ alignItems: "center", justifyContent: "flex-start" })}
`;
const ChannelContainer = styled.div`
    display: flex;
    width: 300px;
`;
const ChannelImage = styled.div`
    width: 60px;
    height: 60px;
    background-image: url(${props => props.logo});
    background-size: cover;
    background-position: center;
    border-radius: 50%;

`;
const ChannelDetails = styled.div`
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 14px;
`;
const ChannelName = styled.h3`

`;
const SubCount = styled.p`
    font-weight: 600;
`;
const ViewContainer = styled.div`
    display: flex;
    width: 300px;
    margin-top: 14px;
`;
const ViewImage = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid white;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ViewDetails = styled.div`
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 14px;
`;
const Title = styled.p`
    font-weight: 600;
`;
const ViewCount = styled.h2`

`;
const VideoContainer = styled.div`
    display: flex;
    width: 300px;
    margin-top: 14px;
`;
const VideoImage = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid white;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const VideoDetails = styled.div`
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 14px;
`;
const VideoCount = styled.h2`

`;

const ButtonContainer = styled.div`
    display: flex;
    width: 300px;
`;

const Button = styled.div`
    width: 150px;
    height: 40px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    margin-top: 30px;
`;
const Right = styled.div`
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${tablet({ justifyContent: "center", marginTop: "10px", marginBottom: "0px" })}
`;

const DesktopContainer = styled.div`
    display: block;
    ${tablet({ display: "none" })}
`;
const MobileContainer = styled.div`
    display: none;
    ${tablet({ display: "block" })}
`;



const YoutubeInfo = () => {

    // data.data.items[0].statistics.viewCount

    const [channelName, setChannelName] = useState("panvoirbeats");
    const [viewCount, setViewCount] = useState(0);
    const [subCount, setSubCount] = useState(0);
    const [videos, setVideos] = useState(0);
    const [logo, setLogo] = useState('img/Logo2.png');

    useEffect(() => {
        axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCLfGfIPh2fOOWMybXb0vOPA&key=${YT_API_KEY}`)
            .then((response) => {
                setChannelName(response.data.items[0].snippet.localized.title);
                setViewCount(response.data.items[0].statistics.viewCount);
                setSubCount(response.data.items[0].statistics.subscriberCount);
                setVideos(response.data.items[0].statistics.videoCount);
                setLogo(response.data.items[0].snippet.thumbnails.medium.url);
                //console.log(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Container>
            <Left>
                <ChannelContainer>
                    <ChannelImage logo={logo}></ChannelImage>
                    <ChannelDetails>
                        <ChannelName>{channelName}</ChannelName>
                        <SubCount>{numberWithCommas(subCount)} subscribers</SubCount>
                    </ChannelDetails>
                </ChannelContainer>

                <ViewContainer>
                    <ViewImage>
                        <VisibilityIcon style={{ fontSize: "30px" }} />
                    </ViewImage>
                    <ViewDetails>
                        <Title>Total views</Title>
                        <ViewCount>{numberWithCommas(viewCount)}</ViewCount>
                    </ViewDetails>
                </ViewContainer>

                <VideoContainer>
                    <VideoImage>
                        <MusicVideoIcon style={{ fontSize: "30px" }} />
                    </VideoImage>
                    <VideoDetails>
                        <Title>Videos</Title>
                        <VideoCount>{numberWithCommas(videos)}</VideoCount>
                    </VideoDetails>
                </VideoContainer>
                <ButtonContainer>
                    <a href='https://www.youtube.com/channel/UCLfGfIPh2fOOWMybXb0vOPA?sub_confirmation=1'
                        target="_blank"
                        style={{ textDecoration: "none" }}>
                        <Button><YouTubeIcon style={{ fontSize: "24px", marginRight: "2px" }} />SUBSCRIBE</Button>
                    </a>

                </ButtonContainer>

            </Left>

            <Right>
                <DesktopContainer>
                    <YoutubeEmbed />
                </DesktopContainer>
                <MobileContainer>
                    <YoutubeEmbedMobile />
                </MobileContainer>
            </Right>
        </Container>
    )
}

export default YoutubeInfo

