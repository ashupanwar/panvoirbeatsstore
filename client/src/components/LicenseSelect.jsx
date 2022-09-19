import React from 'react'
import styled from 'styled-components';
import LicenseSelectCard from './LicenseSelectCard';
import { mobile, minitablet, tablet, largeTablet, smallTablet } from "../responsive";

const Container = styled.div`
    color: white;
    
`;
const Wrapper = styled.div`

    ${tablet({ display: "flex", flexDirection: "column", alignItems: "center" })}
`;
const Heading = styled.h2`
 margin-bottom: 50px;
`;
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    ${tablet({ flexDirection: "column" })}
`;
const Left = styled.div`
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Image = styled.div`
    width: 200px;
    height: 200px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    margin-bottom: 10px;
`;
const Title = styled.h3`
    margin-bottom: 2px;
`;
const Producer = styled.p`
    color: #a8a8a8;
    font-size: 14px;

    ${tablet({ marginBottom: "20px" })}
`;
const Right = styled.div`
    flex: 1;
    width: 100%;
`;

const LicenseSelect = (props) => {
    return (
        <Container>
            <Wrapper>
                <Heading>Choose license type</Heading>
                <Content>
                    <Left>
                        <Image image={props.track.img}></Image>
                        <Title>{props.track.trackname}</Title>
                        <Producer>{props.track.producername}</Producer>
                    </Left>
                    <Right>
                        <LicenseSelectCard
                            track={props.track}
                            price={props.track.nonprofitprice}
                            license={"Non-Profit"}
                            items={"MP3"}
                            musicrecording={"Used for Music Recording"}
                            audiostream={"0 Online Audio Streams"}
                            performance={"Non-profit Live Performances only"}
                            distribution={"Distribute up to 0 copies"}
                            musicvideo={"0 Music Video"}
                            radio={"No Radio Broadcasting rights"} />
                        <LicenseSelectCard
                            track={props.track}
                            price={props.track.basicprice}
                            license={"Basic"}
                            items={"MP3 and WAV"}
                            musicrecording={"Used for Music Recording"}
                            audiostream={"100000 Online Audio Streams"}
                            performance={"Non-profit Live Performances only"}
                            distribution={"Distribute up to 10000 copies"}
                            musicvideo={"1 Music Video"}
                            radio={"No Radio Broadcasting rights"} />
                        <LicenseSelectCard
                            track={props.track}
                            price={props.track.professionalprice}
                            license={"Professional"}
                            items={"MP3, WAV and TRACK STEMS"}
                            musicrecording={"Used for Music Recording"}
                            audiostream={"100000 Online Audio Streams"}
                            performance={"For Profit Live Performances"}
                            distribution={"Distribute up to 10000 copies"}
                            musicvideo={"1 Music Video"}
                            radio={"No Radio Broadcasting rights"} />
                        <LicenseSelectCard
                            track={props.track}
                            price={props.track.unlimitedprice}
                            license={"UNLIMITED"}
                            items={"MP3, WAV and TRACK STEMS"}
                            musicrecording={"Used for Music Recording"}
                            audiostream={"Unlimited Online Audio Streams"}
                            performance={"For Profit Live Performances"}
                            distribution={"Distribute up to Unlimited copies"}
                            musicvideo={"Unlimited Music Video"}
                            radio={"Radio Broadcasting rights (Unlimited Stations)"} />
                    </Right>
                </Content>
            </Wrapper>
        </Container>
    )
}

export default LicenseSelect